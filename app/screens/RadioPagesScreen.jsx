import { StyleSheet, View, StatusBar, ScrollView, Platform } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import RadioButton from "@/components/RadioButton";
import Button from "@/components/Button/Button";
import RadioLabel from "@/components/RadioLabel";
import Label from "@/components/Label";
import { DataContext } from "../context/DataContext";
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
  scheduleLocalNotification,
} from "../../utils/notificationSetup";
import { db, collection, addDoc, doc, setDoc, getDocs } from "../../utils/firebase";

const RadioPagesScreen = () => {
  const { setData } = useContext(DataContext);
  const [category, setCategory] = useState("");
  const [bridalcategory, setBridalcategory] = useState("");
  const [semicategory, setSemiCategory] = useState("");
  const [stiched, setStiched] = useState("");
  const [subunstiched, setSubunstiched] = useState("");
  const [amount, setAmount] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [payment, setPayment] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Sync amount with DataContext for Gpay screen
  useEffect(() => {
    setData(prev => ({ ...prev, amount: amount }));
  }, [amount]);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          const tokenRef = doc(db, "push_tokens", token);
          await setDoc(tokenRef, {
            token: token,
            updatedAt: new Date().toISOString(),
            platform: Platform.OS
          }, { merge: true });
        }
      } catch (err) {
        console.warn("Failed to register device push token in database:", err);
      }
    };
    setupNotifications();
  }, []);

  const handleEnter = async (userData) => {
    try {
      const docRef = await addDoc(collection(db, "orders"), userData);

      if (docRef.id) {
        alert("Order Placed Successfully!");
        await scheduleLocalNotification(
          "Order Placed Successfully! \ud83c\udf89",
          `New ${userData.category} order of ${userData.quantity}x for Rs. ${userData.amount} has been submitted.`
        );

        try {
          const querySnapshot = await getDocs(collection(db, "push_tokens"));
          const tokens = [];
          querySnapshot.forEach((doc) => {
            const tokenData = doc.data();
            if (tokenData.token) {
              tokens.push(tokenData.token);
            }
          });

          if (tokens.length > 0) {
            await sendPushNotification(tokens, `Rs.${userData.amount} received using ${userData.payment} method. New ${userData.category} order placed by ${userData.name || "Customer"}!`);
          }
        } catch (pushErr) {
          console.warn("Failed to broadcast push notification:", pushErr);
        }
      } else {
        alert("Failed to save data to Firebase");
      }
    } catch (err) {
      alert(`Request failed: ${err.message}`);
    } finally {
      reseteverything();
    }
  };

  const reseteverything = () => {
    setName("");
    setPhone("");
    setCategory("");
    setBridalcategory("");
    setSemiCategory("");
    setStiched("");
    setSubunstiched("");
    setInputValue("");
    setAmount("");
    setPayment("");
  };

  const call = () => {
    const time = new Date();
    let currentTime = `${time.getDate()}-${time.getMonth() + 1
      }-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

    let userData = {};
    if (category === "suit") {
      if (
        category === "" ||
        stiched === "" ||
        payment === "" ||
        inputValue === "" ||
        amount === "" ||
        name === "" ||
        phone === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
      userData = {
        category,
        stiched,
        payment,
        quantity: inputValue,
        amount,
        name,
        number: phone,
        time: currentTime,
      };
    } else if (category === "semi") {
      if (stiched === "stiched") {
        if (
          category === "" ||
          semicategory === "" ||
          stiched === "" ||
          payment === "" ||
          inputValue === "" ||
          amount === "" ||
          name === "" ||
          phone === ""
        ) {
          alert("Please fill all the fields");
          return;
        }
        userData = {
          category,
          semicategory,
          stiched,
          payment,
          quantity: inputValue,
          amount,
          name,
          number: phone,
          time: currentTime,
        };
      } else {
        if (
          category === "" ||
          semicategory === "" ||
          stiched === "" ||
          payment === "" ||
          inputValue === "" ||
          amount === "" ||
          subunstiched === "" ||
          name === "" ||
          phone === ""
        ) {
          alert("Please fill all the fields");
          return;
        }
        userData = {
          category,
          semicategory,
          stiched,
          payment,
          subunstiched,
          quantity: inputValue,
          amount,
          name,
          number: phone,
          time: currentTime,
        };
      }
    } else {
      if (stiched === "stiched") {
        if (
          category === "" ||
          bridalcategory === "" ||
          stiched === "" ||
          payment === "" ||
          inputValue === "" ||
          amount === "" ||
          name === "" ||
          phone === ""
        ) {
          alert("Please fill all the fields");
          return;
        }

        userData = {
          category,
          bridalcategory,
          stiched,
          payment,
          quantity: inputValue,
          amount,
          name,
          number: phone,
          time: currentTime,
        };
      } else {
        if (
          category === "" ||
          bridalcategory === "" ||
          stiched === "" ||
          payment === "" ||
          subunstiched === "" ||
          inputValue === "" ||
          amount === "" ||
          name === "" ||
          phone === ""
        ) {
          alert("Please fill all the fields");
          return;
        }

        userData = {
          category,
          bridalcategory,
          stiched,
          payment,
          subunstiched,
          quantity: inputValue,
          amount,
          name,
          number: phone,
          time: currentTime,
        };
      }
    }
    const phoneNumber = Number(phone);
    if (phoneNumber < 999999999 || phoneNumber > 9999999999) {
      alert("Invalid number");
      return;
    }
    handleEnter(userData);
  };

  useEffect(() => {
    if (category !== "suit" && bridalcategory === "" && stiched !== "") {
      setStiched("");
      setPayment("");
    }
    if (category !== "suit" && semicategory === "" && stiched !== "") {
      setPayment("");
      setStiched("");
    }
    if (category !== "semi" && semicategory !== "") {
      setSubunstiched("");
      setPayment("");
      setSemiCategory("");
    }
    if (category !== "bridal" && bridalcategory !== "") {
      setSubunstiched("");
      setPayment("");
      setBridalcategory("");
    }
  }, [category, bridalcategory, semicategory]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: "black" }]}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.center}>
        <Label value="Category:" />
      </View>
      <RadioButton
        options={[
          { label: "Suits", value: "suit" },
          { label: "Semi-Bridal", value: "semi" },
          { label: "Bridal", value: "bridal" },
        ]}
        checkedValue={category}
        onChange={setCategory}
      />
      {category === "semi" && (
        <>
          <View style={styles.center}>
            <Label value="Semi-Bridal Category" />
          </View>
          <RadioButton
            options={[
              { label: "Gown", value: "gown" },
              { label: "Handwork Suit", value: "handwork" },
            ]}
            checkedValue={semicategory}
            onChange={setSemiCategory}
          />
        </>
      )}
      {category === "bridal" && (
        <>
          <View style={styles.center}>
            <Label value="Bridal Category" />
          </View>
          <RadioButton
            options={[
              { label: "Gown", value: "gown" },
              { label: "Lehenga", value: "lehengda" },
              { label: "Ghagara", value: "ghagara" },
              { label: "Farara", value: "farara" },
            ]}
            checkedValue={bridalcategory}
            onChange={setBridalcategory}
          />
        </>
      )}
      {(category === "suit" ||
        semicategory !== "" ||
        bridalcategory !== "") && (
          <>
            <View style={styles.center}>
              <Label value="Stiched" />
            </View>
            <RadioButton
              options={[
                { label: "Stiched", value: "stiched" },
                { label: "Unstiched", value: "unstiched" },
              ]}
              checkedValue={stiched}
              onChange={setStiched}
            />
          </>
        )}
      {stiched === "unstiched" && category !== "suit" && (
        <>
          <View style={styles.center}>
            <Label value="Set" />
          </View>
          <RadioButton
            options={[
              { label: "3 Piece set", value: "piece3" },
              { label: "Gown set", value: "gownset" },
            ]}
            checkedValue={subunstiched}
            onChange={setSubunstiched}
          />
        </>
      )}
      {((category === "suit" && stiched !== "") ||
        subunstiched !== "" ||
        (stiched === "stiched" && category !== "suit")) && (
          <>
            <View style={styles.center}>
              <Label value="Payment Method" />
            </View>
            <RadioButton
              options={[
                { label: "Cash", value: "cash" },
                { label: "UPI", value: "upi" },
                { label: "Card", value: "card" },
              ]}
              checkedValue={payment}
              onChange={setPayment}
            />
          </>
        )}
      {payment !== "" && (
        <View style={{ width: "50%", alignSelf: "center" }}>
          <RadioLabel
            label="Customer Name"
            placeholder={"Enter Name"}
            value={name}
            inputType={"default"}
            onChangeText={setName}
          />
        </View>
      )}
      {payment !== "" && (
        <View style={{ width: "50%", alignSelf: "center" }}>
          <RadioLabel
            label="Customer Number"
            placeholder={"Enter Number"}
            value={phone}
            inputType={"numeric"}
            onChangeText={setPhone}
          />
        </View>
      )}
      {payment !== "" && (
        <View style={{ width: "50%", alignSelf: "center" }}>
          <RadioLabel
            label="Quantity"
            inputType={"numeric"}
            placeholder={"Enter Quantity"}
            value={inputValue}
            onChangeText={setInputValue}
          />
        </View>
      )}
      {payment !== "" && (
        <View style={{ width: "50%", alignSelf: "center" }}>
          <RadioLabel
            inputType={"numeric"}
            label="Amount"
            placeholder={"Enter Amount in Rs."}
            value={amount}
            onChangeText={setAmount}
          />
        </View>
      )}
      <View style={styles.center_cont}>
        <Button
          symbol={"check-circle"}
          onPress={() => {
            call();
          }}
        >
          Submit
        </Button>
      </View>
      <View style={{ alignItems: "center" }}>
        <Button
          onPress={() => {
            reseteverything();
          }}
          style={{ width: "50%" }}
        >
          Reset
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  center_cont: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 38,
    color: "white",
    textAlign: "center",
  },
  label: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RadioPagesScreen;
