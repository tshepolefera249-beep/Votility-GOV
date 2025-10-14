import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  candidate: string;
}

export default function VoteConfirmationModal({ visible, onConfirm, onCancel, candidate }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.text}>Confirm your vote for {candidate}?</Text>
          <View style={styles.buttons}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Confirm" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modal: { width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 },
  text: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' }
});
