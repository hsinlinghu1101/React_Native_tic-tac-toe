import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Pressable } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export default function App() {
  const [board, setBoard]= useState(Array(9).fill(null))
  const [finish, setFinish] = useState(false)
  const [player, setPlayer] = useState(1)

  function handleClickedBox(index){
    if (board[index] === null && !finish && player){
      let newBoard = board
      newBoard[index]=player
      setBoard(newBoard)
      let newPlay = player=== 1 ? 2 : 1
      setPlayer(newPlay)
      checkWinner()
    }
  }

  function updateBox(index){
    if (board[index] === 1){
      return <Icon style={styles.cross} name='close'/>
    }else if (board[index] === 2){
      return <Icon style={styles.circle} name='circle-outline'/>
    }else{
      return <View></View>
    }

  }

 function checkWinner(){
   let winLins=[
     ['0','1','2'],
     ['3','4','5'],
     ['6','7','8'],
     ['0','3','6'],
     ['1','4','7'],
     ['2','5','8'],
     ['0','4','8'],
     ['2','4','6'],
   ]
   
   
   for(let i=0; i<winLins.length; i++){
     let [a,b,c] = winLins[i]
     if(board[a]===board[b] && board[a]===board[c] && board[a]!==null){
       setFinish(true)
       Alert.alert("Player " + player + " is the winner!")
       return
     }
   
    }
    let num=0
    board.forEach(item =>{
      if(item !== null){
        num += 1
      }
    })
    if (num === 9){
      setFinish(true)
      Alert.alert("It is a Draw!")
    }

 }

 function resetGame(){
  setBoard(Array(9).fill(null))
  setFinish(false)
  setPlayer(1)
 }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tic-Tac-Toe</Text>
      {!finish ? <Text style={styles.player}>Next Player: {player===1?"X":"O"} (Player {player}) </Text>
               :<Text style={styles.player}>Please start a new game</Text>}
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>handleClickedBox(0)} style={[styles.cell, {borderLeftWidth:0, borderTopWidth:0}]}>
          {updateBox(0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleClickedBox(1)} style={[styles.cell, {borderTopWidth: 0}]}>
          {updateBox(1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleClickedBox(2)} style={[styles.cell, {borderTopWidth:0, borderRightWidth:0}]}>
          {updateBox(2)}
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>handleClickedBox(3)} style={[styles.cell, {borderLeftWidth: 0}]}>
          {updateBox(3)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleClickedBox(4)} style={styles.cell}>
          {updateBox(4)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleClickedBox(5)} style={[styles.cell, {borderRightWidth:0}]}>
          {updateBox(5)}
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>handleClickedBox(6)} style={[styles.cell, {borderLeftWidth:0, borderBottomWidth:0}]}>
          {updateBox(6)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleClickedBox(7)} style={[styles.cell, {borderBottomWidth:0}]}>
          {updateBox(7)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleClickedBox(8)} style={[styles.cell, {borderRightWidth:0, borderBottomWidth:0}]}>
          {updateBox(8)}
        </TouchableOpacity>   
      </View>
      <Pressable style={styles.btn} onPress={resetGame}><Text style={styles.text}>New Game</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize: 30,
    textAlign: "center",
    paddingBottom: 20,
  },
  player:{
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 50,
  },
  cell:{
    borderWidth:5,
    width: 100,
    height: 100,
    alignItems:'center',
    justifyContent:'center'
  },
  cross:{
    color:'orange',
    fontSize:60,
  },
  circle:{
    color:'blue',
    fontSize:60,
  },
  btn:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 40,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

});
