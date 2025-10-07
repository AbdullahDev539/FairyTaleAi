import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SevenDayProgress = () => {
  const TOTAL_DAYS = 6;
  const [startDate, setStartDate] = useState(null);
  const [daysUsed, setDaysUsed] = useState(0);

  useEffect(() => {
    if (startDate) {
      const updateDays = () => {
        const now = new Date();
        const diffDays = Math.floor(
          (now - new Date(startDate)) / (1000 * 60 * 60 * 24),
        );
        setDaysUsed(Math.min(diffDays, TOTAL_DAYS));
      };

      updateDays();
      const interval = setInterval(updateDays, 1000 * 60 * 60);

      return () => clearInterval(interval);
    }
  }, [startDate]);

  const startTrial = () => {
    setStartDate(new Date().toISOString());
  };

  const progress = (daysUsed / TOTAL_DAYS) * 100;

  return (
    <View style={styles.container}>
      {startDate ? (
        <Text style={styles.text}>{TOTAL_DAYS - daysUsed} Days Left</Text>
      ) : (
        <Text style={styles.text}>Free Trial: 6 Days</Text>
      )}

      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>

      {!startDate && (
        <TouchableOpacity style={styles.btn} onPress={startTrial}>
          <Text style={styles.btnText}>Start Free Trial</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  text: { fontSize: 14, color: '#444', marginBottom: 10 },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e5ea',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progress: {
    height: '100%',
    backgroundColor: '#a78bfa',
  },
  btn: {
    backgroundColor: '#fa8b8b',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600' },
});

export default SevenDayProgress;
