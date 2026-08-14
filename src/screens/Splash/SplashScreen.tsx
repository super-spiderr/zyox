import React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { palette } from '@/theme';

const splashVideo = require('@/assets/videos/splash.mp4');

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  return (
    <Video
      source={splashVideo}
      style={styles.video}
      resizeMode="cover"
      muted
      repeat={false}
      paused={false}
      onEnd={onComplete}
      onError={onComplete}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: palette.black,
  },
});

export default SplashScreen;
