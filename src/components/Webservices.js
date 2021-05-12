import BigDataService from "./BigDataService";
import CloudService from "./CloudService"

const Webservices = () => {
  const showCloudService = false;
  return (
    <div>
      {showCloudService ? <CloudService></CloudService> : <BigDataService/>}
    </div>
  )
}

export default Webservices
