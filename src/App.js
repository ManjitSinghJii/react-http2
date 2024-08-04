import { useState, useRef, useEffect } from "react"
import axios from "axios"

const App = ()=> {

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [refetch, setRefetch] = useState(false)
  const [count, setCount] = useState(0)


  useEffect(()=> {
    test()
  } ,[refetch])

  useEffect(()=> {
    const interval = setInterval(() => {
     setCount((intialValue)=> intialValue =  intialValue +1)
    }, 1000);

    //Clean up function
    return ()=> {
      clearInterval(interval)
    }
  }, [])

  // http request by fetch function method

  // const test = async ()=> {
  //   try{
  //     const response = await fetch('https://fakestoreapi.com/products')
  //     const data = await response.json()
  //     console.log(data)
  //     setPhotos(data)
  //   }
  //   catch(err) {
  //     console.log(err);
  //   }
  // }

  //Http request by axios method
   const test = async ()=> {
    try{
      setLoading(true)
      const response = await axios.get('https://fakestoreapi.com/products')
      const data = response.data
      setPhotos(data);
    }

    catch(err){
      console.log("My Error is.." +err);
    }

    finally {
      setLoading(false)
    }
   }
  return (
    <div>
      <h1 style={{fontSize: "100px"}}>
        Count - {count}</h1>
      <h1>Manjit Singh</h1>
      <button onClick={test}>Test</button>
      <button onClick={()=>setRefetch(!refetch)}>Execute useEffect Code again</button>

      {
        loading && <h1>Loading...</h1>
      }
      
      <div style={{
        margin: '50px auto',
        width: '90%',
        display: 'flex',
        gap: 48,
        flexWrap: 'wrap',
        justifyContent: 'center'

      }}>
        {
          photos.map((item, index)=>(
            <div 
              key={index}
              style={{
                width: 'calc(25% - 48px)',
                border: '1px solid #ccc',
                borderRadius: 8,
                padding: 16,
                boxSizing: 'border-box',
                boxShadow: '0 0 8px #ddd',
                textAlign: 'center',
              }}
            >
                <img src={item.image} width= '180px' />
                <h3>{item.title}</h3>
                <p style={{color: 'gray'}}>{item.description.slice(0, 100)}</p>
                <p>{item.category}</p>
            </div>
          ))
          
        }
      </div>
    </div>
  )
}
export default App