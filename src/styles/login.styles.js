// app/login.styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width >= 768;

// Design System Color Tokens
export const COLORS = {
  bgDark: '#b0e5e8', // slate-950
  panelDark: '#42b2b8', // slate-900
  cardDark: '#d4fbfc',
  inputDark: '#d1e8e3',
  borderDark: '#42b2b8', // slate-800
  borderFocus: '#0ea5e9', // sky-500

  // Accents
  primary: '#0ea5e9', // sky-500
  primaryHover: '#0284c7', // sky-600
  textPrimary: '#011217', // slate-50
  textSecondary: '#94a3b8', // slate-400
  textMuted: '#475569', // slate-600


 // Mobile Header
  // mobileHeader: {
  //   alignItems: 'center',
  //   marginBottom: 32,
  // },

  // States
  emeraldBg: 'rgba(6, 78, 59, 0.4)',
  emeraldBorder: 'rgba(6, 95, 70, 0.6)',
  emeraldText: '#34d399',

  roseBg: 'rgba(136, 19, 55, 0.4)',
  roseBorder: 'rgba(159, 18, 57, 0.6)',
  roseText: '#fb7185',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
    flexDirection: isDesktop ? 'row' : 'column',
  },

  // Left Brand Panel (Desktop)
  brandPanel: {
    display: isDesktop ? 'flex' : 'none',
    width: '50%',
    justifyContent: 'space-between',
    padding: 48,
    backgroundColor: COLORS.panelDark,
    borderRightWidth: 1,
    borderRightColor: COLORS.borderDark,
  },
  brandLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#082f49', // sky-950
    borderWidth: 1,
    borderColor: '#075985', // sky-800
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  brandTitle: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: -0.5,
  },
  badgeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(8, 47, 73, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#0c4a6e',
    marginBottom: 24,
  },
  badgeText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 10,
    marginLeft: 6,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroHeading: {
    color: COLORS.textPrimary,
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 44,
    letterSpacing: -0.8,
    marginBottom: 16,
  },
  heroSubtext: {
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 420,
  },
  metricsRow: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 32,
  },
  metricCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metricIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  metricSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },

  // Right Form Panel
  formScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formPanelContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    justifyContent: 'center',
  },
  formWrapper: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
  },

 
  mobileLogoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#082f49',
    borderWidth: 1,
    borderColor: '#075985',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  // Section Titles
//  headerSection: {
//    marginBottom: 32,
////  },
//  mainHeading: {
//    fontSize: 28,
//    fontWeight: '800',
//    color: COLORS.textPrimary,
//    letterSpacing: -0.5,
//  },

 headerSection: {
    marginBottom: 32,
    alignItems: 'center',
  },

  gymImage: {
    width: 80,
    height: 60,
    marginBottom: 15,
  },

  mainHeading: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },

  subHeading: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 6,
    lineHeight: 20,
  },

  // Alert Banners
  alertBanner: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
  },
  alertText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },

  // Form Controls
  formCard: {
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    padding: 20,
    borderRadius: 24,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
  },
  inputBoxFocused: {
    borderColor: COLORS.borderFocus,
  },
  textInput: {
    flex: 1,
    color: COLORS.textPrimary,
    marginLeft: 10,
    fontSize: 14,
  },

  // Options & Switches
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rememberBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
  },
  checkboxInactive: {
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    backgroundColor: COLORS.inputDark,
  },
  checkboxCheck: {
    color: COLORS.bgDark,
    fontSize: 10,
    fontWeight: '800',
  },
  rememberText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },

  // Buttons
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.bgDark,
    fontWeight: '700',
    fontSize: 14,
    marginRight: 6,
  },
  guestButton: {
    backgroundColor: COLORS.inputDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    height: 46,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  guestButtonText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 8,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.borderDark,
  },
  dividerText: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },

  // Social Grid
  socialGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    backgroundColor: COLORS.panelDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 12,
  },

  // Switch Link
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switchText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  switchLink: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});