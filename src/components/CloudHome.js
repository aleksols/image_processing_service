import { useState, useEffect } from "react"
import Services from "./ServiceList"
import CloudService from "./CloudService"

const CloudHome = () => {
  const [activeService, setActiveService] = useState(null)
  // const [showServiceList, setShowServiceList] = useState(true)
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
    const res = await fetch('http://localhost:5000/services/cloud')
    const data = await res.json()

    return data
  }

  const serviceClick = (service) => {
    setActiveService(service)
  }

  return (
    <>

      {activeService === null ?
        <Services services={services.filter((x) => x.subject === "Cloud")} onClick={serviceClick}></Services>
        :
        <CloudService service={activeService}></CloudService>}
    </>
  )
}

export default CloudHome
