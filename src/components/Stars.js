import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars, reviews}) => {

  
  const tempStarts = Array.from({length:5}, (_,index)=>{
     return(
      <span key={index}>
        {stars >= index + 1 ? <BsStarFill /> : stars >= index+0.5 ? <BsStarHalf /> : <BsStar />}
      </span>
     )
  })

  
  return <Wrapper>
    <div className='stars'>
     <span>{tempStarts}</span> <br />
      {stars >= 1 ? <span> <BsStarFill /> </span> : stars >= 0.5 ? <span><BsStarHalf /> </span> : <span><BsStar /></span>}
      {stars >= 2 ? <span> <BsStarFill /> </span> : stars >= 1.5 ? <span><BsStarHalf /> </span> : <span><BsStar /></span>}
      {stars >= 3 ? <span> <BsStarFill /> </span> : stars >= 2.5 ? <span><BsStarHalf /> </span> : <span><BsStar /></span>}
      {stars >= 4 ? <span> <BsStarFill /> </span> : stars >= 3.5 ? <span><BsStarHalf /> </span> : <span><BsStar /></span>}
      {stars >= 5 ? <span> <BsStarFill /> </span> : stars >= 4.5 ? <span><BsStarHalf /> </span> : <span><BsStar /></span>}
    </div>
    <p className='reviews'>({reviews}) Customers Reviews</p>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
