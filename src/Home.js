import React from 'react'

export default function Home(props) {
    console.log(props);
    const d = props;
  return (
    <div>
      Home of {d.ans};
    </div>
  )
}
