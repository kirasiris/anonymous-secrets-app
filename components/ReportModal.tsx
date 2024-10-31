import { fetchurl } from '@/scripts/fetchurl';
import { useState } from 'react';
import { View, StyleSheet, Pressable, Modal, TouchableWithoutFeedback, TextInput, Button } from 'react-native';
import { Toast } from 'toastify-react-native';
import { FontAwesomeIcon } from './FontAwesomeIcon';
import { ThemedText } from './ThemedText';

export function ReportModal({ resourceId = null, postType = '', onModel = 'Report' }){
    const [reportModal, setReportModal] = useState(false);

    const [rawFormData, setRawFormData] = useState({
        title: '',
        text: ''
    });

    const { title, text } = rawFormData;

    const [btnText, setBtnText] = useState('Submit');

    const sendReport = async (e: any) => {
        setBtnText('...')
        const res = await fetchurl(`/reports/${resourceId}`, "POST", "no-cache", {
            ...rawFormData,
            postType: postType,
            onModel: onModel,
            website: 'YourSecretApp'
        });
        if(res.status === 'error') {
            Toast.error(res.message, 'bottom');
            setBtnText('Submit');
            return;
        }
        Toast.success('Report sent', 'bottom');
        setReportModal(false);
        resetForm();
        setBtnText('Submit');
    }

    const resetForm = () => {
        setRawFormData({
            title: '',
            text: ''
        });
    };

  return (
    <>
        <View style={styles.centeredView}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={reportModal}
                onRequestClose={() => {
                    setReportModal(!reportModal);
                }}
            >
                <TouchableWithoutFeedback onPress={() => {
                    setReportModal(false)
                    resetForm();
                }}>
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <ThemedText type='default' style={[styles.modalText]}>Report Object Id {resourceId}</ThemedText>
                                <TextInput
                                    style={[styles.formControl, styles.mb3]}
                                    onChangeText={e => {
                                        setRawFormData({
                                            ...rawFormData,
                                            title: e
                                        });
                                    }}
                                    value={title}
                                    placeholder='Title'
                                    keyboardType='default'
                                />
                                <TextInput
                                    style={[styles.formControl, styles.mb3]}
                                    onChangeText={e => {
                                    setRawFormData({
                                        ...rawFormData,
                                        text: e
                                    })
                                    }}
                                    value={text}
                                    placeholder='Here goes the message'
                                    keyboardType="default"
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                <View style={styles.fixToText}>
                                    <Button title="Clear" onPress={resetForm} />
                                    <Button title={btnText} onPress={sendReport} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
        <Pressable
            style={{
                backgroundColor: "#F2F2F2",
            }}
            onPress={() => setReportModal(true)}
        >
            <FontAwesomeIcon name='exclamation' size={15} />
        </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      formControl: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: "400",
        // lineHeight: 1.5,
        color: '#212529',
        backgroundColor: "#fff",
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dee2e6',
        borderRadius: 0,
      },
      mb3: {
        marginBottom: 16
      },
      fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
});