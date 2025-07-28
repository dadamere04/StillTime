import React from 'react';
import { View, StyleSheet } from 'react-native';

export function Skeleton({ className = '', style, children }) {
  return (
    <View 
      style={[
        styles.skeleton, 
        style,
        { opacity: 0.7 }
      ]} 
      className={`bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
});

export function SkeletonText({ width = '100%', height = 16, className = '', style }) {
  return (
    <Skeleton 
      style={[{
        width: typeof width === 'number' ? width : '100%',
        height: typeof height === 'number' ? height : 16,
      }, style]} 
      className={`h-4 ${className}`} 
    />
  );
}

export function SkeletonCircle({ size = 40, className = '', style }) {
  return (
    <Skeleton 
      style={[{
        width: size,
        height: size,
        borderRadius: size / 2,
      }, style]} 
      className={`rounded-full ${className}`} 
    />
  );
}
