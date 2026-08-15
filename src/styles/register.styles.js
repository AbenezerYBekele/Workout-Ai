// styles/register.styles.js
import { StyleSheet } from 'react-native';
import { COLORS as LOGIN_COLORS } from './login.styles';

// Re-export the shared semantic color tokens (primary, text, alert colors, etc.)
// so register.jsx stays in sync with the rest of the auth flow.
export const COLORS = LOGIN_COLORS;

const PALETTE = {
  bgBase: '#020617', // slate-950
  cardBg: 'rgba(15, 23, 42, 0.6)', // slate-900/60
  cardBorder: '#1e293b', // slate-800
  inputBg: '#020617', // slate-950
  inputBorder: '#1e293b', // slate-800
  iconBoxBg: '#082f49', // sky-950
  iconBoxBorder: '#075985', // sky-800
  primary: '#0ea5e9', // sky-500
  primaryPressed: '#0284c7', // sky-600
  link: '#38bdf8', // sky-400
  textMuted: '#475569', // slate-600
  textSubtle: '#64748b', // slate-500
  textLabel: '#94a3b8', // slate-400
  alertBg: 'rgba(76, 5, 25, 0.4)', // rose-950/40
  alertBorder: 'rgba(136, 19, 55, 0.6)', // rose-900/60
  alertText: '#fda4af', // rose-300
};

export { PALETTE };

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.bgBase,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formWrapper: {
    width: '100%',
    alignSelf: 'center',
    maxWidth: 380,
  },

  // Header
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: PALETTE.iconBoxBg,
    borderWidth: 1,
    borderColor: PALETTE.iconBoxBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  subtitle: {
    color: PALETTE.textSubtle,
    fontSize: 12,
    marginTop: 4,
  },

  // Alert banner
  alertBanner: {
    backgroundColor: PALETTE.alertBg,
    borderWidth: 1,
    borderColor: PALETTE.alertBorder,
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    color: PALETTE.alertText,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 10,
    flex: 1,
  },

  // Form card
  formCard: {
    backgroundColor: PALETTE.cardBg,
    borderWidth: 1,
    borderColor: PALETTE.cardBorder,
    padding: 20,
    borderRadius: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputGroupLast: {
    marginBottom: 20,
  },
  inputLabel: {
    color: PALETTE.textLabel,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.inputBg,
    borderWidth: 1,
    borderColor: PALETTE.inputBorder,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
  },
  inputBoxFocused: {
    borderColor: PALETTE.primary,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    marginLeft: 12,
    fontSize: 14,
  },

  // Primary button
  primaryButton: {
    backgroundColor: PALETTE.primary,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  primaryButtonPressed: {
    backgroundColor: PALETTE.primaryPressed,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#030712',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 6,
  },

  // Footer
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  switchText: {
    color: PALETTE.textSubtle,
    fontSize: 14,
  },
  switchLink: {
    color: PALETTE.link,
    fontWeight: '600',
    fontSize: 14,
  },
});