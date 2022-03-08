
import React, { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem, CardGroup, Row, Col } from 'react-bootstrap'
import axios from 'axios'


function Home() {

      const [carsInfo, setcarsInfo] = useState([])

      useEffect(() => {
            getCarsInfo()
      }, [])

      let getCarsInfo = async () => {
            try {
                  let res = await axios.get("http://localhost:8085/user/car/info")
                  if (!res.data.error) {
                        setcarsInfo(res.data.allCarDetails)
                  } else {
                        alert(res.data.message)
                  }
            } catch (error) {
                  console.log(error)
            }

      }
      let powerSteering = "";
      let getSteering = (data) => {
            if (data) {
                  powerSteering = "true"
            } else {
                  powerSteering = "false"
            }
      }
      return (
            <div >

                  <div id="carouselExampleInterval" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                              <div className="carousel-item active" data-interval="4000">
                                    <img src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/GLC/6837/1595496146343/front-left-side-47.jpg" className="d-block w-100 " height="600px" alt="..." />
                              </div>
                              <div className="carousel-item" data-interval="4000">
                                    <img src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Altroz/7250/1594615312120/rear-left-view-121.jpg" className="d-block w-100" height="600px" alt="..." />
                              </div>
                              <div className="carousel-item" data-interval="4000">
                                    <img src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Q7/8778/1643958105459/front-left-side-47.jpg" className="d-block w-100" height="600px" alt="..." />
                              </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-target="#carouselExampleInterval" data-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span className="sr-only">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-target="#carouselExampleInterval" data-slide="next">
                              <span className="sr-only">Next</span>
                              <span className="carousel-control-next-icon" aria-hidden="true"></span>

                        </button>
                  </div>
                  <CardGroup className='bg-secondary bg-gradient'>
                        <Row   >
                              {carsInfo.map((car, index) => {
                                    getSteering()
                                    return (
                                          <Col key={index} className='mt-5'>
                                                <Card  key={index} md={4} className='m-3' style={{ width: '25rem' }}>
                                                      <Card.Img variant="top" className="rounded" width={"20rem"} height={"150rem"} src={car.imageURL} />
                                                      <Card.Body>
                                                            <Card.Title className='bg-info bg-gradient'>{car.name}</Card.Title>
                                                      </Card.Body>
                                                      <ListGroup className="list-group-flush">
                                                      <ListGroup className="list-group-flush">
                                                            <ListGroupItem>Brand Name:{car.company}</ListGroupItem>
                                                            <ListGroupItem>Fuel Type:{car.fuelType}</ListGroupItem>
                                                            <ListGroupItem>Showromm Price:{car.showroomPrice}</ListGroupItem>
                                                            <ListGroupItem>Onroad Price:{car.onroadPrice}</ListGroupItem>
                                                            <ListGroupItem>Power Steering:{powerSteering}</ListGroupItem>
                                                            <ListGroupItem>Break System:{car.breakSystem}</ListGroupItem>
                                                            <ListGroupItem>Mileage:{car.mileage}</ListGroupItem>
                                                            <ListGroupItem>Seating Capacity:{car.seatingCapacity}</ListGroupItem>
                                                            <ListGroupItem>Engine Capacity:{car.engineCapacity}</ListGroupItem>
                                                            <ListGroupItem>Gear Type:{car.gearType}</ListGroupItem>
                                                      </ListGroup>

                                                      </ListGroup>
                                                </Card>
                                          </Col>)
                              })}
                        </Row>
                        <br></br>
                  </CardGroup>
            </div>
      )
}

export default Home