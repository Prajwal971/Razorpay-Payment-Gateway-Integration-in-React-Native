import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import RazorpayCheckout from 'react-native-razorpay';


export default function App() {

  const [successId, setSuccessId] = useState('')
  const [fCode, setFCode] = useState('')
  const [fDesc, setFDesc] = useState('')
  const [fMetadataPaymentId, setFMetadataPaymentId] = useState('')
  const [fReason, setFReason] = useState('')
  const [fSource, setFSource] = useState('')
  const [name, setName] = useState('demoName1')
  const [amt, setAmt] = useState('200')
  const [desc, setDesc] = useState('demoDescription')

  const makePayment = () => {
    setSuccessId('')
    setFCode('')
    var options = {
      description: desc,
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: '', // Your api key
      amount: amt,
      name: name,
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software'
      },
      theme: { color: '#F37254' }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      setSuccessId(data.razorpay_payment_id)
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      console.log(error)
      setFCode(error.error.code)
      setFDesc(error.error.description)
      setFMetadataPaymentId(error.error.metadata.payment_id)
      setFReason(error.error.reason)
      setFSource(error.error.source)
      alert(`Error: ${error.code} || ${error.description} || ${error.error.code}`);
      console.log(error.description)
    });
  }
  return (
    <View style={styles.container}>
      <Button
        title='MAke a payment'
        onPress={makePayment}
      />
      {
        successId
        && <Text>Payment SuccessFul. Kindly note the payment ID for future Purpose  {successId}</Text>
      }

      {
        fCode
        && <Text> {fDesc} / {fSource} kindly note the paymentID {fMetadataPaymentId} , {fCode}</Text>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})