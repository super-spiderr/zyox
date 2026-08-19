import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Pdf from 'react-native-pdf';
import { X, Share2 } from 'lucide-react-native';
import { Text } from '@/components';
import { useAppTheme } from '@/theme';
import { useStyles } from '@/hooks/useStyles';
import getStyles from './styles';

interface InvoicePreviewModalProps {
  visible: boolean;
  onClose: () => void;
  fileUri: string | null;
  isLoading?: boolean;
  onSharePress?: () => void;
  isSharing?: boolean;
}

export const InvoicePreviewModal: React.FC<InvoicePreviewModalProps> = ({
  visible,
  onClose,
  fileUri,
  isLoading = false,
  onSharePress,
  isSharing = false,
}) => {
  const { theme } = useAppTheme();
  const styles = useStyles(getStyles);

  const [isRendering, setIsRendering] = useState(true);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    if (fileUri) {
      setIsRendering(true);
      setRenderError(false);
    }
  }, [fileUri]);

  let pdfUri: string | null = null;
  if (fileUri) {
    pdfUri = fileUri.startsWith('file://') ? fileUri : `file://${fileUri}`;
  }
  const showSpinner = isLoading || !pdfUri || isRendering;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.safeAreaWrapper} edges={['top']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerButton} onPress={onClose}>
              <X size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <Text variant="bold" fontSize={16} color={theme.colors.text}>
              Invoice
            </Text>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onSharePress}
              disabled={!onSharePress || isSharing || !fileUri}
            >
              {isSharing ? (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              ) : (
                <Share2 size={19} color={onSharePress ? theme.colors.primary : theme.colors.textMuted} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.pdfWrapper}>
            {pdfUri !== null && !renderError ? (
              <Pdf
                source={{ uri: pdfUri }}
                style={styles.pdf}
                onLoadComplete={() => setIsRendering(false)}
                onError={() => {
                  setIsRendering(false);
                  setRenderError(true);
                }}
              />
            ) : null}

            {showSpinner && !renderError && (
              <View style={styles.centerFillAbsolute}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text color="textSecondary" style={styles.loadingText}>
                  Preparing invoice...
                </Text>
              </View>
            )}

            {renderError && (
              <View style={styles.centerFillAbsolute}>
                <Text color="textSecondary">Could not display the invoice.</Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default InvoicePreviewModal;
