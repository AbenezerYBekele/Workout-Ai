// app/(tabs)/nutrition.styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width >= 768;

// Design System Color Tokens
export const COLORS = {
     bgDark: '#b0e5e8', // slate-950
     cardDark: '#d4fbfc', // slate-900
     inputDark: '#d1e8e3',
     borderDark: '#1e293b', // slate-800
     borderFocus: '#0ea5e9', // sky-500

     primary: '#10b981', // sky-500
     primaryHover: '#0284c7', // sky-600
     primaryBorder: '#38bdf8', // sky-400
     textPrimary: '#020617',
     textSecondary: '#020617',
     textMuted: '#475569',

  // Feature Palettes
  orangeText: '#f97316',
  skyText: '#38bdf8',
  amberText: '#fbbf24',
  emeraldText: '#34d399',

  buttonBgHover: 'rgba(56, 189, 248, 0.2)',
  buttonBorder: 'rgba(56, 189, 248, 0.5)',
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

  // Screen Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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

  // Empty State View
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
    maxWidth: 280,
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

  // Macro Summary Banner
  macroBanner: {
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  macroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  macroStatBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  macroStatText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },
  waterStatText: {
    color: COLORS.textSecondary,
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 6,
  },

  // Macro Breakdown Chips
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(2, 6, 23, 0.6)',
    padding: 12,
    borderRadius: 14,
  },
  macroChip: {
    flex: 1,
    alignItems: 'center',
  },
  macroChipBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.borderDark,
  },
  macroChipLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },
  macroChipValue: {
    fontWeight: '700',
    fontSize: 14,
  },

  // Segmented Control Switcher
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardDarkSolid,
    padding: 4,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: COLORS.primarySolid,
  },
  tabBtnText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 8,
  },
  tabBtnTextActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },

  // Meal Accordion Card
  mealCard: {
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: 20,
    marginBottom: 12,
    overflow: 'hidden',
  },
  mealHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealInfo: {
    flex: 1,
    marginRight: 8,
  },
  mealType: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mealTitle: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 16,
    marginTop: 2,
  },
  mealCalories: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  mealExpandBody: {
    backgroundColor: 'rgba(2, 6, 23, 0.6)',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderDark,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 8,
  },
  bulletItem: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 4,
    lineHeight: 18,
  },
  recipeText: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 20,
    marginTop: 2,
  },

  // Grocery Checklist Box
  groceryBox: {
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: 20,
    padding: 16,
  },
  groceryTitle: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
  },
  groceryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(30, 41, 59, 0.5)',
  },
  groceryCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.textMuted,
    backgroundColor: COLORS.bgDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groceryCheckboxChecked: {
    backgroundColor: COLORS.primarySolid,
    borderColor: COLORS.primary,
  },
  groceryItemText: {
    fontSize: 14,
    color: '#e2e8f0', // slate-200
    flex: 1,
  },
  groceryItemTextChecked: {
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
});