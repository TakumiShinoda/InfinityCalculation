import { InfPlusCore, fillDecimal, checkBiggerWithMinus, InfSubstractCore } from './CalculationCore' 
import { Exist } from './Utils'

export function InfPlus(firstNum: string, secNum: string): string {
  let decimalLongerLength: number = 0
  let firstNumDec: string | null = null
  let secNumDec: string | null = null
  let firstNumNat: string = ""
  let secNumNat: string = ""
  let natureResult: string = ""
  let decimalResult: string | null = null
  let result: string = ""
  let fixedDecimals: string[];

  if(firstNum.indexOf('.') >= 0){
    firstNumNat = firstNum.substring(0, firstNum.indexOf('.'))
    firstNumDec = firstNum.substring(firstNum.indexOf('.') + 1)
  }else firstNumNat = firstNum
  if(secNum.indexOf('.') >= 0){
    secNumNat = secNum.substring(0, secNum.indexOf('.'))
    secNumDec = secNum.substring(secNum.indexOf('.') + 1)
  }else secNumNat = secNum 
  natureResult = InfPlusCore(firstNumNat, secNumNat)
  if(firstNumDec != null || secNumDec != null){
    if(firstNumDec == null) firstNumDec = "0"
    if(secNumDec == null) secNumDec = "0"
    fixedDecimals = fillDecimal(firstNumDec, secNumDec)
    if(firstNumDec.length == secNumDec.length){
      if(firstNumDec.length > secNumDec.length) decimalLongerLength = firstNumDec.length
      else decimalLongerLength = secNumDec.length
    }
    decimalResult = InfPlusCore(fixedDecimals[0], fixedDecimals[1])
    if(decimalResult.length > decimalLongerLength){
      decimalResult = decimalResult.substring(1)
      natureResult = InfPlusCore(natureResult, "1")
    }
  }
  decimalResult == null ? result = natureResult : result = natureResult + '.' + decimalResult

  return result
}
 
export function InfSubstract(firNum: string, secNum: string){ 
  let result: string = ''
  let decimalResult: string = ''
  let decimalLargerNum: string = ''
  let decimalSmallerNum: string = ''
  let largerNumDot: number = -1
  let smallerNumDot: number = -1
  let largerNum: string = ''
  let smallerNum: string = ''
  let secPlus: boolean = false
  let addMinus: boolean = false 

  console.log('input1', firNum)
  console.log('input2', secNum)
  
  secNum.indexOf('-') >= 0 ? secPlus = true : secPlus = false
  largerNum = checkBiggerWithMinus(firNum, secNum)[0]
  smallerNum = checkBiggerWithMinus(firNum, secNum)[1]
  console.log('largerRAW', largerNum)
  console.log('smallerRAW', smallerNum)

  largerNumDot = largerNum.indexOf('.')
  smallerNumDot = smallerNum.indexOf('.')
  if(largerNumDot >= 0){
    decimalLargerNum = largerNum.substring(largerNumDot + 1, largerNum.length)
    largerNum = largerNum.substring(0, largerNumDot)
  }

  if(smallerNumDot >= 0){ 
    decimalSmallerNum = smallerNum.substring(smallerNumDot + 1, smallerNum.length)
    smallerNum = smallerNum.substring(0, smallerNumDot)
  }

  if((Exist(largerNum, '-') || Exist(smallerNum, '-')) && (Exist(largerNum, '-') != Exist(smallerNum, '-'))){
    secPlus ? addMinus = false : addMinus = true
    result = InfPlus(largerNum, smallerNum.substring(1, smallerNum.length))
  }else if(Exist(largerNum, '-') && Exist(smallerNum, '-')){
    result = InfSubstractCore(secNum.substring(1, secNum.length), firNum.substring(1, firNum.length))
  }else if(!Exist(largerNum, '-') && !Exist(smallerNum, '-')){
    if(largerNum == firNum){
      result = InfSubstractCore(largerNum, smallerNum)
    }else{
      result = InfSubstractCore(largerNum, smallerNum) 
      addMinus = true
    }
  }

  if(addMinus) result = '-' + result
  console.log('larger', largerNum)
  console.log('smaller', smallerNum)
  console.log('decLar', decimalLargerNum)
  console.log('decSma', decimalSmallerNum)
  console.log('result', result + '\n')

  return result
}