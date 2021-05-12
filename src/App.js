import Header from './components/Header'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CloudService from './components/CloudService'
import ServiceList from './components/ServiceList'
import BigDataService from './components/BigDataService'
import CloudHome from './components/CloudHome'

function App() {
  const [activeService, setActiveService] = useState(null)
  const [services, setServices] = useState([])

  useEffect(() => {
    const getServices = async () => {
      const servicesFromServer = await fetchServices()
      console.log(servicesFromServer)
      setServices(servicesFromServer)
    }
    getServices()
  }, [])

  const fetchServices = async () => {
    const res = await fetch('http://localhost:5000/services')
    const data = await res.json()

    return data
  }

  const serviceClick = (service) => {
    setActiveService(service)
  }

  return (
    <Router>
      <div className="App">
        <h1 onClick={() => setActiveService(null)} href="/">Absolute Compute</h1>
        <Header onClick={() => setActiveService(null)}></Header>
        <Route path='/' exact
          render={() =>
            <div>
              <h2>Select Either Cloud Computing Services or Big Data Visualization</h2>
            </div>
          }
        ></Route>
        <Route path='/cloud'
          component={
            () => activeService === null ?
              <ServiceList services={services.filter((x) => x.subject === "Cloud")} onClick={serviceClick}></ServiceList>
              :
              <CloudService service={activeService}></CloudService>
          }
        >
        </Route>
        <Route path='/big-data' component={
          // () =>
          //   <BigDataService service={services[3]}></BigDataService>
          () => activeService === null ?
            <ServiceList services={services.filter((x) => x.subject == "BigData")} onClick={serviceClick}></ServiceList>
            :
            <BigDataService service={activeService}></BigDataService>
        }></Route>
      </div>
    </Router>
  );
}

export default App;
