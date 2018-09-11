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