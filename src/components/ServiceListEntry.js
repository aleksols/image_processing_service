
const ServiceListEntry = ({ service, onClick }) => {
  return (
    <div
      className='service'
      onClick={() => onClick(service)}
    >
      <h3>
        {service.name}
      </h3>
      <p>{service.description}</p>
    </div>
  )
}

export default ServiceListEntry