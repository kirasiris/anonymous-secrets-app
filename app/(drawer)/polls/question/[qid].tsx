import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react'
import { PixelRatio, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Toast } from 'toastify-react-native';
import { FontAwesomeIcon } from '@/components/FontAwesomeIcon';
import { fetchurl } from '@/scripts/fetchurl';
import { Loader } from '@/components/Loader';
import styles from '@/assets/style';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ReadQuestionScreen() {
  const router = useRouter();

  const [question, setQuestion] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [ipAddress, setIpAddress] = useState<any>({});
  const params = useLocalSearchParams();
  
  useEffect(() => {

    const abortController = new AbortController();

    const fetchQuestion = async () => {
      try {
        const res = await fetchurl(
          `/questions/${params.qid}`, // url
          "GET", // method
          'no-cache', // cache
          {}, // body
          abortController.signal, // signal
          false, // multipart
          false // is remote
        );

        if(res.status === 'error') {
          Toast.error(res.message, 'bottom');
          router.navigate(`/polls`);
          return;
        }

        setQuestion(res.data);

      } catch (err) {
        console.log('Error fetching question:', err);
      } finally {
        setLoading(false)
      }
    }
    
    fetchQuestion();

    return () => abortController.abort();

  }, [params.qid]);

  // Get the font scale factor
  const scale = PixelRatio.getFontScale();

  // Define a font size based on scale factor
  const scaledFontSize = 16 * scale;

  // Fetch IP Address
  useEffect(() => {

    const abortController = new AbortController();

    const fetchIpAddress = async () => {
      try {
        const res = await fetchurl(
          `https://api.ipify.org?format=json`, // url
          "GET", // method
          "default", // cache
          {}, // body
          abortController.signal, // signal
          false, // multipart
          true // is remote
        );

        setIpAddress(res);

      } catch (err) {
        console.log('Error fetching ip adress:', err)
      }
     }

     fetchIpAddress();

     return () => abortController.abort();

  }, [params.qid]);

  // Cast a vote
  const castVote = async (answer: any) => {
    const res = await fetchurl(
      `/polls/${question.resourceId}/question/${params.qid}/vote`, // url
      "PUT", // method
      "default", // cache
      {optionKey: answer}, // body
      undefined, // signal
      false, // multipart
      false // is remote
    );

    if(res.status === 'error') {
      Toast.error(res.message, 'bottom');
      return;
    }
    Toast.success('Vote sent', 'bottom');

    setSelectedAnswer(answer);
  }

  useEffect(() => {
    if(Platform.OS === "web") {
      router.push(`/polls`);
    }
  }, [params.qid]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Reading...',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: scaledFontSize, // Use scaled font size
          },
          // headerLeft: () => <Text>Example Left</Text>,
          headerRight: () => <Link href={`/filter`}><FontAwesomeIcon name='filter' lightColor="#000" darkColor="#FFF" style={[styles.filterIcon]} /></Link>
        }}
      />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView>
            {loading ? <Loader /> : (
              question !== undefined && question !== null && question !== '' && (
                <View style={[styles.container]}>
                  <ThemedText type="default">{question.text}</ThemedText>
                  <ThemedText type="default">{question.resourceId}</ThemedText>
                  {/* Display answers */}
                  {Object.entries(question.answers).map(([key, answer]) => {
                    // Check if the user has voted already
                    const ipAddressHasVoted = answer.voters.some((voter) => voter.ip === ipAddress?.ip);
                    return (
                    <TouchableOpacity
                      key={key}
                      style={[
                        customstyles.answerButton,
                        selectedAnswer === key || ipAddressHasVoted
                        ? customstyles.selectedButton
                        : null,
                      ]}
                      onPress={() => castVote(key)}
                      disabled={selectedAnswer || ipAddressHasVoted}
                    >
                      <ThemedText type="default">{answer.text}</ThemedText>
                      <ThemedText type="default" style={[customstyles.voteCount]}>
                          Votes: {answer.votes}
                        </ThemedText>
                    </TouchableOpacity>
                  )})}
                </View>
              )
            )}
        </ScrollView>
      </ThemedView>
    </>
  )
}

const customstyles = StyleSheet.create({
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#007bff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  selectedButton: {
    backgroundColor: '#4caf50',
  },
  voteCount: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 5,
  },
})