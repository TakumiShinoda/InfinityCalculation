import { InfPlusCore, fillDecimal } from './CalculationCore'

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