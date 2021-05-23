import React, { useState } from 'react'

const aligned = {
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  justifyContent: 'space-between'
}

const self = {
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: 'auto',
  margin: '20px'
}

const Calculator = () => {

  const [ str, setStr ] = useState('')
  const [ result, setResult ] = useState('')
  const [ selected, setSelected] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    setResult( '' )
    console.log(str)
    let myStr = str
    let newStr = ''
    let myArray = []

    for (let char of myStr + ',') {
        if (char !== ',') {
            newStr += char
        } else {
                if (!isNaN(parseInt(newStr))) {
                   myArray.push(parseInt(newStr))
                } else {
                setResult( 'Invalid input.' )
                }
        return
        }
      newStr = '' 
    }

    let calculus = 0
    let rmode = 1
    let mode = {}
    let nn = ''

    calculus = myArray.reduce((acc, num) => {
      acc += num
      return acc
    }, 0)

    myArray.forEach(num => {
        nn = num.toString()

        if (mode[nn]) {
            mode[nn] += 1
        } else {
            mode[nn] = 1
        }
    })

    for (let kee in mode) {
      if (mode[kee] > rmode) {
        rmode = kee
      }
    }

    switch ( selected ) {
      case 'sum':
                    setResult( calculus )
                    break
      case 'average':
                    setResult( (calculus / myArray.length ).toFixed(2) )
                    break
      case 'mode':
                    setResult( rmode )
                    break
      default:
                    setResult( 'Please select a method' )
    }
  }

  const selectedValue = e => {

    setSelected( e.target.value )  
  }

  const handleChange = e => {
    setStr( e.target.value )
  }


return (
      <div>
        <form style={aligned} onSubmit={ handleSubmit }>
          <input
            type='text'
            name='numbers'
            id='numbers'
            onChange={ handleChange }
            style={self}
          />
          <select
            name='select'
            id='select'
            style={self}
            onChange={ selectedValue }
          >
            <option value='none'></option>
            <option value='sum'>sum</option>
            <option value='average'>average</option>
            <option value='mode'>mode</option>
          </select>
          <button type='submit' style={self}>
            Calculate
          </button>
        </form>
        <p id='result' style={self}>
          {result}
        </p>
      </div>
    )

}
export default Calculator
