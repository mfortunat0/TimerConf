import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([])
  const [inputDate, setInputData] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length) {
        const newData = data.map(index => {
          const { name, now, waiting: { hour, minute, second } } = index
          if (second === 59) {
            return { name, now, waiting: { hour, minute: minute + 1, second: 0 } }
          }
          if (minute === 59) {
            return { name, now, waiting: { hour: hour + 1, minute: 0, second } }
          }
          else {
            return { name, now, waiting: { hour, minute, second: second + 1 } }
          }
        })
        setData(newData)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);


  function inputGetDate(event) {
    setInputData(event.target.value)
  }

  function buttonInsertClick() {
    if (inputDate) {
      setData([...data, {
        name: inputDate,
        now: `${new Date().getHours()}H ${new Date().getMinutes()}M`,
        waiting: { hour: 0, minute: 0, second: 0 }
      }])
      setInputData('')
    }
  }

  function buttonDeleteClick(name) {
    setData(data.filter(value => {
      return value.name !== name ? true : false
    }))
  }

  const pContainerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center' }
  const pStyle = { marginBottom: '0' }
  const containerContent = { color: 'white', marginTop: '10px', padding: '10px 0px', borderRadius: '10px' }
  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-md-8">
            <div className="form-group" style={{ marginTop: '40px' }}>
              <input type="text" autoFocus className="form-control" value={inputDate} onChange={inputGetDate} />
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <button className="btn btn-primary" onClick={() => buttonInsertClick()}>Adicionar</button>
        </div>
        <div className="container bg-primary" style={containerContent} >
          <div className="row">
            <div className="col col-md-4">
              <p className="text-center">Empresa</p>
            </div>
            <div className="col col-md-3">
              <p className="text-center">Chegada</p>
            </div>
            <div className="col col-md-3">
              <p className="text-center">Tempo em Espera</p>
            </div>
          </div>
          {data.length ? (data.map(value => (
            <div className="row" style={{ marginBottom: '5px' }} key={value.name}>
              <div className="col col-md-4" style={pContainerStyle}>
                <p className="text-center font-weight-bold" style={pStyle}>{value.name}</p>
              </div>
              <div className="col col-md-3" style={pContainerStyle}>
                <p style={pStyle}>{value.now}</p>
              </div>
              <div className="col col-md-3" style={pContainerStyle}>
                <p className="text-center" style={pStyle}>{`${value.waiting.hour}H ${value.waiting.minute}M ${value.waiting.second}S`}</p>
              </div>
              <div className="col col-md-2">
                <button className="btn btn-danger" onClick={() => buttonDeleteClick(value.name)}>Excluir</button>
              </div>
            </div>
          ))) : (<h1 className="text-center">Adicione itens</h1>)}
        </div>
      </div>
    </>
  );
}
export default App;
