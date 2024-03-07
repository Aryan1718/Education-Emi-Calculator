
function converMonth(val){
    return val*12
}

function converMonthRate(val){
    return (val/(12*100))
}

function calEmi(p,roi,t){
    let emi;

    let roiInMonth = converMonthRate(roi)
    let durationInMonth = converMonth(t)

    emi = p * (roiInMonth*Math.pow((1+roiInMonth),durationInMonth)/(Math.pow((1+roiInMonth),durationInMonth)-1))

    return emi
}

function onlyInterest(rate,amount){
    return ((amount * (rate/100))/12)   
}

function totalInAmount(amount,rate,time){
    const mRate = converMonthRate(rate)
    const timeInMonth = converMonth(time)+6
    const newAmount = (amount * timeInMonth * mRate)
    return newAmount
}

const btn = document.querySelector('button')

btn.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log('clicked')
    const p = Number(document.getElementById('loanAmount').value)
    const roi = document.getElementById('interestRate').value
    const t = Number(document.getElementById('loanTerm').value)
    const ctime = Number(document.getElementById('courseTime').value)
    const mperiod = document.getElementById('moratoriumPeriod').value
    if(mperiod == 'Principal Moratorium'){
        document.querySelector('#emiAmountIn').innerHTML = `${Math.round(onlyInterest(roi,p))}₹ per month`
        document.querySelector('#emiAmount').innerHTML = `${Math.round(calEmi(p,roi,t))}₹ per month`
        document.getElementById('emiResult').classList.remove('hidden')
        document.getElementById('emiResultIn').classList.remove('hidden')

    }
    else if(mperiod == 'Complete Moratorium'){
        const interestAmount = totalInAmount(p,roi,ctime)
        console.log(typeof(interestAmount))
        const newAmount = interestAmount + p
        console.log(newAmount)
        document.querySelector('#emiAmount').innerHTML = `${Math.round(calEmi(newAmount,roi,t))}₹ per month`
        document.getElementById('emiResult').classList.remove('hidden')
    }
})