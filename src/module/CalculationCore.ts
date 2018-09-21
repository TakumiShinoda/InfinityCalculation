import { Exist } from './Utils'

function plusOne(target: string): string {
  let targetRev: string = target.split("").reverse().join("")
  let moveUp: boolean = true
  let cnt: number = 0;
  let calcResult: number = 0
  let result: string = "";

  while(cnt < targetRev.length){
    if(moveUp){
      calcResult = parseInt(targetRev[cnt]) + 1
      moveUp = false
    }else{
      calcResult = parseInt(targetRev[cnt])
    }
    if(calcResult >= 10){
      calcResult %= 10
      moveUp = true
    }
    result = calcResult + result
    cnt += 1
  }
  return result
}

function substractOne(numStr: string): string{
  let result: string = ""
  let numStrRev:string = numStr.split("").reverse().join("")
  let cnt: number = 0
  let calcResult = 0
  let moveDown: boolean = true

  while(cnt < numStrRev.length) {
    if(moveDown){
      calcResult = parseInt(numStrRev[cnt]) - 1
    }else{
      calcResult = parseInt(numStrRev[cnt])
    }
    if(calcResult < 0) calcResult = 10 + calcResult
    else moveDown = false
    result = calcResult.toString() + result
    cnt += 1
  }

  return result
}

export function checkBigger(firNum: string, secNum: string): string[] {
  let larger: string | null = null
  let lower: string | null = null

  if(firNum.length == secNum.length){
    for(var i = 0; i < firNum.length; i++){
      if(firNum[i] != secNum[i]){
        firNum > secNum ? larger = firNum : larger = secNum
        firNum > secNum ? lower = secNum : lower = firNum
      }
    }
    if(larger == null) larger = firNum
    if(lower == null) lower = secNum
  }else if(firNum.length > secNum.length){
    larger = firNum
    lower = secNum
  }else if(firNum.length < secNum.length){
    larger = secNum
    lower = firNum
  }

  if(larger != null && lower != null) {
    return [larger, lower]
  }else{
    return [firNum, secNum]
  }
}

export function checkBiggerWithMinus(firNum: string, secNum: string): string[]{
  let largerNum: string = ''
  let smallerNum: string = ''

  if((Exist(firNum, '-') || Exist(secNum, '-')) && (Exist(firNum, '-') != Exist(secNum, '-'))){
    Exist(firNum, '-') ? largerNum = secNum : largerNum = firNum
    Exist(firNum, '-') ? smallerNum = firNum : smallerNum = secNum
  }else{
    if(Exist(firNum, '-') && Exist(secNum, '-')){
      let absFirNum: string = firNum.substring(1, firNum.length)
      let absSecNum: string = secNum.substring(1, secNum.length)

      largerNum = '-' + checkBigger(absFirNum, absSecNum)[1]
      smallerNum = '-' + checkBigger(absFirNum, absSecNum)[0]
    }else{
      largerNum = checkBigger(firNum, secNum)[0]
      smallerNum = checkBigger(firNum, secNum)[1]
    }
  }

  return [largerNum, smallerNum]
}

function removeTopZero(numStr: string): string {
  let result: string = ""
  let zeroLength: number = 0

  for(var i = 0; i < numStr.length; i++){
    if(numStr[i] == '0') zeroLength += 1 
    else break
  }
  result = numStr.substring(zeroLength, numStr.length)

  return result
}

export function fillDecimal(firstNumDec: string, secNumDec: string): string[] {
  let decimalDiff: number = 0

  if(firstNumDec.length != secNumDec.length){
    if(firstNumDec.length > secNumDec.length){
      decimalDiff = firstNumDec.length - secNumDec.length
      for(var i = 0; i < decimalDiff; i++) secNumDec += '0'
    }else{
      decimalDiff = secNumDec.length - firstNumDec.length
      for(var i = 0; i < decimalDiff; i++) firstNumDec += '0'
    }
  }

  return [firstNumDec, secNumDec]
}

export function InfPlusCore(firstNum: string, secNum: string): string {
  let result: string = ""
  let moveUp: boolean = false
  let shorterLength: number = 0
  let diffLength: number = 0
  let firstNumRev: string = firstNum.split("").reverse().join("")
  let secNumRev: string = secNum.split("").reverse().join("")
  let overNum: string = "0";

  if(firstNum.length > secNum.length){
    shorterLength = secNum.length
    diffLength = firstNum.length - shorterLength
    overNum = firstNum
  }else{
    shorterLength = firstNum.length
    diffLength = secNum.length - shorterLength
    overNum = secNum
  }
  overNum = overNum.substring(0, diffLength);
  for(var i = 0; i < shorterLength; i++){
    let firstNumInt: number = parseInt(firstNumRev[i])
    let secNumInt: number = parseInt(secNumRev[i])
    let calcResult: number = firstNumInt + secNumInt
    
    if(moveUp){
      moveUp = false
      calcResult += 1
    }
    if(calcResult >= 10){
      moveUp = true;
      calcResult %= 10
    }
    result = calcResult.toString() + result
  }
  if(diffLength == 0 && moveUp) result = "1" + result
  moveUp ? result = plusOne(overNum) + result : result = overNum + result

  return result
}

export function InfSubstractCore(firNum: string, secNum: string): string{ // do not use minus value
  let minus: boolean = false
  let moveDown: boolean = false
  let diffLength: number = 0
  let calcResult: number = 0
  let largerNum: string = ""
  let lowerNum: string = ""
  let overNum: string | null = null
  let result: string = ""

  if(firNum.length == secNum.length){
    largerNum = checkBigger(firNum, secNum)[0].split("").reverse().join("")
    lowerNum = checkBigger(firNum, secNum)[1].split("").reverse().join("")
    if(largerNum.split("").reverse().join("") != firNum) minus = true
  }else if(firNum.length > secNum.length){ 
    diffLength = firNum.length - secNum.length
    overNum = firNum.substring(0, diffLength)
    largerNum =  firNum.split("").reverse().join("")
    lowerNum = secNum.split("").reverse().join("")
  }else if(firNum.length < secNum.length){
    diffLength = secNum.length - firNum.length
    overNum = secNum.substring(0, diffLength)
    largerNum = secNum.split("").reverse().join("")
    lowerNum = firNum.split("").reverse().join("")
    minus = true
  }

  for(var i = 0; i < lowerNum.length; i++){
    moveDown ? calcResult = (parseInt(largerNum[i]) - parseInt(lowerNum[i])) - 1 : calcResult = parseInt(largerNum[i]) - parseInt(lowerNum[i])
    moveDown = false

    if(calcResult < 0){
      calcResult = 10 + calcResult
      moveDown = true
    }
    result = calcResult.toString() + result
  }

  if(moveDown && overNum != null) overNum = substractOne(overNum)
  if(overNum != null) result = overNum + result
  result = removeTopZero(result)
  if(minus) result = '-' + result

  return result
}