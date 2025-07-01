
import { StyleSheet } from '@react-pdf/renderer';
import { baseStyles } from './baseStyles';
import { headerStyles } from './headerStyles';
import { cardStyles } from './cardStyles';
import { tableStyles } from './tableStyles';
import { footerStyles } from './footerStyles';

// Combine all styles into a single export
export const styles = StyleSheet.create({
  ...baseStyles,
  ...headerStyles,
  ...cardStyles,
  ...tableStyles,
  ...footerStyles,
});
