
import { StyleSheet } from '@react-pdf/renderer';
import { avatarStyles } from './avatarStyles';
import { userInfoStyles } from './userInfoStyles';
import { portfolioStyles } from './portfolioStyles';
import { insightStyles } from './insightStyles';
import { summaryStyles } from './summaryStyles';

export const cardStyles = StyleSheet.create({
  ...avatarStyles,
  ...userInfoStyles,
  ...portfolioStyles,
  ...insightStyles,
  ...summaryStyles,
});
