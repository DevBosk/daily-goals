import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function startAddGoalHandler() {
    setShowModal(true);
  }

  function endAddGoalHandler() {
    setShowModal(false);
  }

  function addGoalHandler(enteredGoalText) {
    setGoals((prev) => {
      return [...prev, { text: enteredGoalText, id: Math.random().toString() }];
    });
    setShowModal(false);
  }

  function deleteGoalHandler(id) {
    setGoals((prev) => {
      return prev.filter((goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add New Goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />
      <GoalInput
        show={showModal}
        onAddGoal={addGoalHandler}
        onCloseModal={endAddGoalHandler}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          alwaysBounceVertical
          data={goals}
          keyExtractor={(goal) => {
            return goal.id;
          }}
          renderItem={(itemData) => (
            <GoalItem
              id={itemData.item.id}
              text={itemData.item.text}
              onDeleteHandler={deleteGoalHandler}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
