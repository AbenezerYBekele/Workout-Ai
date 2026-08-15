import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TrendingUp, Camera } from 'lucide-react-native';
import { db, storage, auth } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { styles, COLORS } from '../../styles/progress.styles';

export default function ProgressScreen() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [weightLbs, setWeightLbs] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    fetchProgressLogs();
  }, [user]);

  const fetchProgressLogs = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, 'users', user.uid, 'progress_logs'),
        orderBy('createdAt', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedLogs = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setLogs(fetchedLogs);
    } catch (error) {
      console.error('Error fetching progress logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const uploadPhoto = async (uri) => {
    if (!uri) return null;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(new TypeError('Network request failed'));
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const filename = `progress_photos/${user.uid}/${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);

    await uploadBytes(storageRef, blob);

    if (blob.close) blob.close();

    return await getDownloadURL(storageRef);
  };

  const handleSaveLog = async () => {
    if (!weightLbs) {
      Alert.alert('Incomplete', 'Please enter your current weight.');
      return;
    }

    setSaving(true);
    try {
      let uploadedPhotoUrl = null;
      if (photoUri) {
        uploadedPhotoUrl = await uploadPhoto(photoUri);
      }

      const lbsValue = Number(weightLbs);

      const newLog = {
        weightLbs: lbsValue,
        weightKg: Number((lbsValue / 2.20462).toFixed(2)),
        caloriesBurned: Number(caloriesBurned) || 0,
        photoURL: uploadedPhotoUrl,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'users', user.uid, 'progress_logs'), newLog);

      setWeightLbs('');
      setCaloriesBurned('');
      setPhotoUri(null);
      await fetchProgressLogs();
      Alert.alert('Success 🎉', 'Progress log saved!');
    } catch (error) {
      console.error('Error saving log:', error);
      Alert.alert('Error', 'Failed to save progress entry.');
    } finally {
      setSaving(false);
    }
  };

  const chartLabels = logs.length > 0 ? logs.map((l) => l.date) : ['Start'];

  const chartWeightData = logs.length > 0
    ? logs.map((l) => {
        if (l.weightLbs !== undefined) return Number(l.weightLbs);
        if (l.weightKg !== undefined) return Number((l.weightKg * 2.20462).toFixed(1));
        return 150;
      })
    : [150];

  const chartWidth = Platform.OS === 'web'
    ? Math.min(Dimensions.get('window').width - 64, 600)
    : Dimensions.get('window').width - 64;

  const primaryColor = COLORS?.primary || '#38bdf8';
  const textMutedColor = COLORS?.textMuted || '#64748b';

  return (
    <View style={styles?.container}>
      <ScrollView contentContainerStyle={styles?.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles?.heading}>Progress Tracking </Text>
        <Text style={styles?.subheading}>Monitor weight trends and physical transformation.</Text>

        {/* Chart */}
        <View style={styles?.card}>
          <View style={styles?.cardTitleRow}>
            <TrendingUp color={primaryColor} size={18} />
            <Text style={styles?.cardTitle}>Weight History (lbs)</Text>
          </View>

          {loading ? (
            <ActivityIndicator color={primaryColor} style={{ marginVertical: 32 }} />
          ) : (
            <LineChart
              data={{
                labels: chartLabels.slice(-6),
                datasets: [{ data: chartWeightData.slice(-6) }],
              }}
              width={chartWidth}
              height={180}
              chartConfig={{
                backgroundColor: '#0f172a',
                backgroundGradientFrom: '#1e293b',
                backgroundGradientTo: '#0f172a',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(56, 189, 248, ${opacity})`,
                labelColor: () => '#94a3b8',
              }}
              getDotProps={() => ({
                r: '4',
                strokeWidth: '2',
                stroke: '#38bdf8',
              })}
              bezier
              style={{ borderRadius: 12, marginVertical: 8 }}
            />
          )}
        </View>

        {/* Log Form */}
        <View style={styles?.card}>
          <Text style={[styles?.cardTitle, { marginBottom: 12, marginLeft: 0 }]}>
            Log Daily Metrics
          </Text>

          <View style={styles?.formRow}>
            <View style={styles?.inputGroup}>
              <Text style={styles?.label}>Weight (lbs)</Text>
              <TextInput
                style={styles?.input}
                placeholder="e.g. 165.5"
                placeholderTextColor={textMutedColor}
                keyboardType="numeric"
                value={weightLbs}
                onChangeText={setWeightLbs}
              />
            </View>
            <View style={styles?.inputGroup}>
              <Text style={styles?.label}>Calories Burned</Text>
              <TextInput
                style={styles?.input}
                placeholder="e.g. 450"
                placeholderTextColor={textMutedColor}
                keyboardType="numeric"
                value={caloriesBurned}
                onChangeText={setCaloriesBurned}
              />
            </View>
          </View>

          <TouchableOpacity style={styles?.photoButton} onPress={pickImage} activeOpacity={0.8}>
            <Camera color={primaryColor} size={18} />
            <Text style={styles?.photoButtonText}>
              {photoUri ? 'Photo Selected ✅' : 'Add Progress Photo'}
            </Text>
          </TouchableOpacity>

          {photoUri && <Image source={{ uri: photoUri }} style={styles?.previewImage} />}

          <TouchableOpacity
            style={styles?.submitButton}
            onPress={handleSaveLog}
            disabled={saving}
            activeOpacity={0.8}
          >
            {saving ? (
              <ActivityIndicator color="#030712" />
            ) : (
              <Text style={styles?.submitButtonText}>+ Save Progress Entry</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}