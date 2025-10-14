import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';

import { X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { newsArticles, NewsArticle } from '@/mocks/news';

export default function NewsScreen() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const renderArticle = ({ item }: { item: NewsArticle }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => setSelectedArticle(item)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.articleImage} />
      <View style={styles.articleContent}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleSummary} numberOfLines={2}>
          {item.summary}
        </Text>
        <Text style={styles.articleDate}>
          {new Date(item.date).toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Latest News</Text>
        <Text style={styles.headerSubtitle}>Stay informed about elections</Text>
      </View>

      <FlatList
        data={newsArticles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={!!selectedArticle}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedArticle(null)}
      >
        {selectedArticle && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedArticle(null)}
              >
                <X size={24} color={Colors.black} />
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              <Image
                source={{ uri: selectedArticle.image }}
                style={styles.modalImage}
              />
              <View style={styles.modalBody}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{selectedArticle.category}</Text>
                </View>
                <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
                <Text style={styles.modalDate}>
                  {new Date(selectedArticle.date).toLocaleDateString('en-ZA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                <Text style={styles.modalText}>{selectedArticle.content}</Text>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.black,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.grey,
  },
  listContent: {
    padding: 16,
  },
  articleCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  articleImage: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.lightGrey,
  },
  articleContent: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.black,
    marginBottom: 8,
    lineHeight: 26,
  },
  articleSummary: {
    fontSize: 14,
    color: Colors.grey,
    lineHeight: 20,
    marginBottom: 12,
  },
  articleDate: {
    fontSize: 12,
    color: Colors.grey,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    paddingBottom: 32,
  },
  modalImage: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.lightGrey,
  },
  modalBody: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: Colors.black,
    marginBottom: 12,
    lineHeight: 34,
  },
  modalDate: {
    fontSize: 14,
    color: Colors.grey,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 24,
  },
});
