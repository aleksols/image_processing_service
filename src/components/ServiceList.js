import ServiceListEntry from './ServiceListEntry'

const ServiceList = ({ services, onClick }) => {
  return (
    <>
      {services.map((service, index) => (
        <ServiceListEntry key={index} service={service} onClick={onClick}/>
      ))}
    </>
  )
}

export default ServiceList