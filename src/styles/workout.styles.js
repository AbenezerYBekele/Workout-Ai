// src/styles/workout.styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width >= 768;

export const COLORS = {
   bgDark: '#b0e5e8', // slate-950
     cardDark: '#d4fbfc', // slate-900
     inputDark: '#d1e8e3',
     borderDark: '#1e293b', // slate-800
     borderFocus: '#0ea5e9', // sky-500



      // Accents
     primary: '#10b981', // sky-500
     primaryHover: '#0284c7', // sky-600
     primaryBorder: '#38bdf8', // sky-400
     textPrimary: '#020617',
     textSecondary: '#020617',
     textMuted: '#475569',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 32,
    maxWidth: isDesktop ? 680 : '100%',
    width: '100%',
    alignSelf: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgDark,
    padding: 24,
  },
  timerBanner: {
    backgroundColor: COLORS.primarySolid,
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  timerSkip: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  generateBtn: {
    backgroundColor: COLORS.buttonBgHover,
    borderWidth: 1,
    borderColor: COLORS.buttonBorder,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  generateBtnText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 6,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryGenerateBtn: {
    backgroundColor: COLORS.primarySolid,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryGenerateBtnText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },
  dayScroll: {
    marginBottom: 16,
    maxHeight: 46,
  },
  dayTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  dayTabActive: {
    backgroundColor: COLORS.primarySolid,
    borderColor: COLORS.primary,
  },
  dayTabText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 12,
  },
  dayTabTextActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  focusBanner: {
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  focusLabel: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  focusTitle: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 18,
    marginTop: 2,
  },
  focusDurationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  focusDurationText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 6,
  },
  exerciseCard: {
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },
  exerciseCardCompleted: {
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    borderColor: COLORS.emeraldBorder,
  },
  exerciseHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  exerciseCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  exerciseName: {
    fontWeight: '700',
    fontSize: 15,
    color: COLORS.textPrimary,
    marginLeft: 12,
    flex: 1,
  },
  exerciseNameCompleted: {
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  swapBtn: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  swapBtnText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 11,
    marginLeft: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 6, 23, 0.6)',
    padding: 12,
    borderRadius: 14,
    justifyContent: 'space-between',
  },
  metricBox: {
    alignItems: 'center',
    flex: 1,
  },
  metricBoxBorder: {
    borderRightWidth: 1,
    borderRightColor: COLORS.borderDark,
  },
  metricLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },
  metricValue: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 13,
  },
  timerMetricBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerMetricText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 6,
  },
  instructionsText: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 10,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default function Dummy() { return null; }