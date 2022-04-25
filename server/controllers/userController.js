const mysql = require("mysql");
const { pin } = require("nodemon/lib/version");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

var id = 0;
var driverId = 0;

exports.mainPage = (req, res) => {
  res.render("index");
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          fetchWay = (x) => x.password === password;
          row = rows.filter(fetchWay);

          res.render("index");
          if (row.length != 0) {
            id = row[0].id;
            console.log(id);
            res.redirect("/profile");
          }
        } else {
          console.log(err);
        }
        console.log(rows);
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.registerDriver = (req, res) => {
  const {
    name,
    email,
    mobileNo,
    taxiNo,
    carType,
    carModel,
    licenseNo,
    password,
  } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);
    let car;
    if (carType == 1) {
      car = "Sedan";
    } else if (carType == 2) {
      car = "Auto";
    } else if (carType == 3) {
      car = "Pool";
    } else if (carType == 4) {
      car = "Mini";
    }
    //user the connection
    connection.query(
      "INSERT INTO driver SET name = ?, email = ?, mobileNo = ?, taxiNo = ?, carType = ?, carModel = ?, licenseNo = ?, password = ?",
      [name, email, mobileNo, taxiNo, car, carModel, licenseNo, password],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();
        driverId = rows.insertId;
        console.log(rows.insertId);

        if (!err) {
          res.render("registerdriver");
          console.log(rows);
          driverId = rows.insertId;
          res.redirect("/driverMenu");
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
        id = rows.insertId;
      }
    );
  });
};
exports.registerDriverPage = (req, res) => {
  res.render("registerdriver");
};

exports.view = (req, res) => {
  res.render("register");
  // pool.getConnection((err, connection) => {
  //     if(err) throw err;
  //     console.log('connected as ID' + connection.threadId)

  //     connection.query('SELECT * FROM user', (err, rows) => {
  //         // When done with the connection , release it
  //         connection.release();

  //         if(!err){
  //             let removedUser = req.query.removed;
  //             res.render('register', {rows, removedUser})
  //         }
  //         else{
  //             console.log(err)
  //         }

  //         console.log('The data from user table: \n',rows);

  //     });
  // })
};

exports.driverDetail = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "SELECT * FROM driver WHERE id = ?",
      [driverId],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();
        console.log(rows.insertId);

        if (!err) {
          res.render("driverdetails", rows[0]);
          console.log(rows);
        } else {
          console.log(err);
        }
        console.log(rows);
        console.log("The data from user table: \n", rows[0]);
      }
    );
  });
};

exports.updateDriver = (req, res) => {
  const { updateDriverCard, newValue } = req.body;
  console.log(id);

  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    if (updateDriverCard == 1) {
      connection.query(
        "UPDATE driver SET name = ? WHERE id = ?",
        [newValue, driverId],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM driver where id = ?",
                [driverId],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("driverdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (updateDriverCard == 2) {
      connection.query(
        "UPDATE driver SET mobileNo = ? WHERE id = ?",
        [newValue, driverId],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM driver where id = ?",
                [driverId],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("driverdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (updateDriverCard == 3) {
      connection.query(
        "UPDATE driver SET email = ? WHERE id = ?",
        [newValue, driverId],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM driver where id = ?",
                [driverId],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("driverdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (updateDriverCard == 4) {
      connection.query(
        "UPDATE driver SET password = ? WHERE id = ?",
        [newValue, driverId],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM driver where id = ?",
                [driverId],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("driverdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (updateDriverCard == 5) {
      connection.query(
        "UPDATE driver SET taxiNo = ? WHERE id = ?",
        [newValue, driverId],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM driver where id = ?",
                [driverId],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("driverdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (updateDriverCard == 6) {
      connection.query(
        "UPDATE driver SET carType = ? WHERE id = ?",
        [newValue, driverId],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM driver where id = ?",
                [driverId],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("driverdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (updateDriverCard == 7) {
      connection.query(
        "UPDATE driver SET carModel = ? WHERE id = ?",
        [newValue, driverId],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM driver where id = ?",
                [driverId],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("driverdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
  });
};
exports.loginDriverPage = (req, res) => {
  res.render("logindriver");
};

exports.loginDriver = (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "SELECT * FROM driver WHERE email = ?",
      [email],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          fetchWay = (x) => x.password === password;
          row = rows.filter(fetchWay);

          res.render("logindriver");
          if (row.length != 0) {
            driverId = row[0].id;
            console.log(id);
            res.redirect("/driverMenu");
          }
        } else {
          console.log(err);
        }
        console.log(rows);
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.rideDetail = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "SELECT * FROM ride where driverId = ?",
      [driverId],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          res.render("ridedetails", { rows });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.findRideDetail = (req, res) => {
  const {
    pickupLocationDriver,
    dropLocationDriver,
    paymentSelection,
    dateSelection,
  } = req.body;

  console.log(pickupLocationDriver);
  console.log(dropLocationDriver);
  console.log(paymentSelection);
  console.log(dateSelection);

  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);
    let payment = " ";
    if (paymentSelection == 1) {
      payment = "Online";
    } else if (paymentSelection == 2) {
      payment = "Cash";
    } else {
      payment = " ";
    }
    //user the connection
    connection.query(
      "SELECT * FROM ride where driverId = ? AND pickupLocation LIKE ? OR dropLocation LIKE ? OR paymentMode LIKE ? OR date LIKE ?",
      [
        driverId,
        '%' + pickupLocationDriver + '%',
        '%' + dropLocationDriver + '%',
        '%' + payment + '%',
        '%' + dateSelection + '%',
      ],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          res.render("ridedetails", { rows });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.ratingDetail = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "SELECT * FROM ride where driverId = ?",
      [driverId],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          res.render("ratingdetails", { rows });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
};
exports.findRatingDetail = (req, res) => {
  const { ratingCard } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "SELECT * FROM ride where driverId = ? AND rating = ?",
      [driverId, ratingCard],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          res.render("ratingdetails", { rows });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
};
exports.driverMenu = (req, res) => {
  res.render("drivermenu");
};

exports.create = (req, res) => {
  const { name, email, password, mobile } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "INSERT INTO user SET name= ?, password = ? , email = ?, mobile = ?",
      [name, password, email, mobile],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();
        id = rows.insertId;
        console.log(rows.insertId);

        if (!err) {
          res.render("register", { alert: "User added successfully" });
          console.log(rows);
          id = rows.insertId;
          res.redirect("/profile");
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
        id = rows.insertId;
      }
    );
  });
};

exports.profile = (req, res) => {
  res.render("successful", { id });
};

exports.viewDetail = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query("SELECT * FROM user WHERE id = ?", [id], (err, rows) => {
      // When done with the connection , release it
      connection.release();
      console.log(rows.insertId);

      if (!err) {
        res.render("userdetails", rows[0]);
        console.log(rows);
      } else {
        console.log(err);
      }
      console.log(rows);
      console.log("The data from user table: \n", rows[0]);
    });
  });
};

exports.update = (req, res) => {
  const { cards, updated_value } = req.body;
  console.log(id);

  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    if (cards == 1) {
      connection.query(
        "UPDATE user SET name = ? WHERE id = ?",
        [updated_value, id],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM user where id = ?",
                [id],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("userdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (cards == 2) {
      connection.query(
        "UPDATE user SET mobile = ? WHERE id = ?",
        [updated_value, id],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM user where id = ?",
                [id],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("userdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (cards == 3) {
      connection.query(
        "UPDATE user SET email = ? WHERE id = ?",
        [updated_value, id],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM user where id = ?",
                [id],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("userdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (cards == 4) {
      connection.query(
        "UPDATE user SET password = ? WHERE id = ?",
        [updated_value, id],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM user where id = ?",
                [id],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("userdetails", rows[0]);
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
  });
};

exports.addressView = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "SELECT * FROM address where userId = ?",
      [id],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          res.render("savedaddress", { rows });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.rideView = (req, res) => {
  const cost = "cost";
  const time = "time";
  const driverName = "DriverName";
  const driverCarNo = "DriverCarNo.";
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "SELECT * FROM address where userId = ?",
      [id],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          res.render("bookride", { rows, cost, time, driverName, driverCarNo });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
};
let driverName;
let driverCarNo;
let driverId1;
let finalPickUpLocation;
let finalDropLocation;
let cost;
let driverCarType;

exports.bookRide = (req, res) => {
  const {
    pickupCard,
    dropCard,
    paymentCard,
    ratingCard,
    pickupLocation,
    dropLocation,
    carTypeCard,
  } = req.body;
  console.log(paymentCard);
  console.log(ratingCard);
  console.log(pickupCard);
  if (paymentCard == undefined && ratingCard == undefined) {
    if (pickupCard === "Select location") {
      console.log("hello");
      finalPickUpLocation = pickupLocation;
    } else if (pickupCard != undefined) {
      pool.getConnection((err, connection) => {
        if (err) throw err; // not  connected
        console.log("connected as ID " + connection.threadId);

        //user the connection
        connection.query(
          "SELECT * FROM address where id = ?",
          [pickupCard],
          (err, AddressRow) => {
            // When done with the connection , release it
            connection.release();

            if (!err) {
              finalPickUpLocation = AddressRow[0].title;
            } else {
              console.log(err);
            }

            console.log("The data from user table: \n", AddressRow);
          }
        );
      });
    }

    console.log(finalPickUpLocation);
    console.log(finalDropLocation);
    if (dropCard === "Select location") {
      finalDropLocation = dropLocation;
    } else if (dropCard != undefined) {
      pool.getConnection((err, connection) => {
        if (err) throw err; // not  connected
        console.log("connected as ID " + connection.threadId);

        //user the connection
        connection.query(
          "SELECT * FROM address where id = ?",
          [dropCard],
          (err, AddressRow) => {
            // When done with the connection , release it
            connection.release();

            if (!err) {
              finalDropLocation = AddressRow[0].title;
              console.log("previous" + finalDropLocation);
            } else {
              console.log(err);
            }
            console.log("drop");
            console.log("The data from user table: \n", AddressRow);
          }
        );
      });
    }
  }
  if (paymentCard == undefined && ratingCard == undefined) {
    pool.getConnection((err, connection) => {
      if (err) throw err; // not  connected
      console.log("connected as ID " + connection.threadId);

      //user the connection

      let carType;
      cost = Math.floor(Math.random() * 1000 + 1);
      let time = "8:00";
      if (carTypeCard == 1) {
        carType = "Mini";
      } else if (carTypeCard == 2) {
        carType = "Sedan";
      } else if (carTypeCard == 3) {
        carType = "Pool";
      } else if (carTypeCard == 4) {
        carType = "Auto";
      }

      console.log(carType);
      connection.query(
        "SELECT * FROM driver where carType = ?",
        [carType],
        (err, driverRow) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {

            driverName = driverRow[0].name;
            driverCarNo = driverRow[0].taxiNo;
            driverCarType = driverRow[0].carType;
            driverId1 = driverRow[0].id;
            res.render("bookride", { driverName, driverCarNo, cost, time });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", driverRow);
        }
      );
    });
  } else {
    pool.getConnection((err, connection) => {
      if (err) throw err; // not  connected
      console.log("connected as ID " + connection.threadId);
      console.log("afer" + finalDropLocation);
      var today = new Date();
      var date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

      let payment;
      if (paymentCard == 1) {
        payment = "Cash";
      } else if (paymentCard == 2) {
        payment = "Online";
      }
      connection.query(
        "INSERT INTO ride SET date = ?, rating = ?, pickupLocation = ?, dropLocation = ?, paymentMode = ?, driverName = ?, taxiNo = ?, taxiType = ?, amount = ?, driverId = ?, userId = ?",
        [
          date,
          ratingCard,
          finalPickUpLocation,
          finalDropLocation,
          payment,
          driverName,
          driverCarNo,
          driverCarType,
          cost,
          driverId1,
          id,
        ],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              connection.query(
                "SELECT * FROM ride WHERE date = ? AND rating = ? AND pickupLocation = ? AND dropLocation = ? AND paymentMode = ? AND driverName = ? AND taxiNo = ? AND taxiType = ? AND amount = ? AND driverId = ? AND userId = ?",
                [
                  date,
                  ratingCard,
                  finalPickUpLocation,
                  finalDropLocation,
                  payment,
                  driverName,
                  driverCarNo,
                  driverCarType,
                  cost,
                  driverId1,
                  id,
                ],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    let rideId1 = rows[0].id;

                    pool.getConnection((err, connection) => {
                      if (err) throw err; // not  connected
                      console.log("connected as ID " + connection.threadId);

                      connection.query(
                        "INSERT INTO payment SET rideId = ?, paymentMode = ?, amount = ?, date = ?, userId = ?, driverId = ?",
                        [rideId1, payment, cost, date, id, driverId1],
                        (err, rows) => {
                          // When done with the connection , release it
                          connection.release();

                          if (!err) {
                            pool.getConnection((err, connection) => {
                              if (err) throw err; // not  connected
                              console.log(
                                "connected as ID " + connection.threadId
                              );

                              let searchTerm = req.body.search;

                              //user the connection
                              connection.query(
                                "UPDATE driver SET userId = ? WHERE id = ?",
                                [id, driverId1],
                                (err, rows) => {
                                  // When done with the connection , release it
                                  connection.release();

                                  if (!err) {
                                    const cost = "cost";
                                    const time = "time";
                                    const driverName = "DriverName";
                                    const driverCarNo = "DriverCarNo.";
                                    pool.getConnection((err, connection) => {
                                      if (err) throw err; // not  connected
                                      console.log(
                                        "connected as ID " + connection.threadId
                                      );

                                      //user the connection
                                      connection.query(
                                        "SELECT * FROM address where userId = ?",
                                        [id],
                                        (err, rows) => {
                                          // When done with the connection , release it
                                          connection.release();

                                          if (!err) {
                                            res.render("bookride", {
                                              rows,
                                              cost,
                                              time,
                                              driverName,
                                              driverCarNo,
                                            });
                                          } else {
                                            console.log(err);
                                          }

                                          console.log(
                                            "The data from user table: \n",
                                            rows
                                          );
                                        }
                                      );
                                    });
                                  } else {
                                    console.log(err);
                                  }

                                  console.log(
                                    "The data from user table: \n",
                                    rows
                                  );
                                }
                              );
                            });
                          } else {
                            console.log(err);
                          }

                          console.log("The data from user table: \n", rows);
                        }
                      );
                    });
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    });
  }
};
exports.rideHistory = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "SELECT * FROM ride where userId = ?",
      [id],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          res.render("ridehistory", { rows });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.findRideHistory = (req, res) => {
  const {
    pickupLocationUser,
    dropLocationUser,
    paymentSelection,
    carTypeSelection,
    date,
  } = req.body;


  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);
    let payment = "";
    if (paymentSelection == 1) {
      payment = "Online";
    } else if (paymentSelection == 2) {
      payment = "Cash";
    } else {
      payment = "";
    }

    let carType = "";
    if(carTypeSelection == 1){
      carType = "Sedan";
    }
    else if (carTypeSelection == 2){
      carType = "Auto";
    }
    else if (carTypeSelection == 3){
      carType = "Pool";
    }
    else if (carTypeSelection == 4){
      carType = "Mini";
    }

    //user the connection
    connection.query(
      "SELECT * FROM ride WHERE pickupLocation LIKE ? OR dropLocation LIKE ? OR paymentMode LIKE ? OR taxiType LIKE ? OR date LIKE ? AND userID = ?",
      [
        
        '%' + pickupLocationUser + '%',
        '%' + dropLocationUser + '%',
        '%' + payment + '%',
        '%' + carType + '%',
        '%' + date + '%',
        id
      ],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          res.render("ridehistory", { rows });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
}

exports.paymentHistory = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    //user the connection
    connection.query(
      "SELECT * FROM payment where userId = ?",
      [id],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          res.render("paymenthistory", { rows });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.findPaymentHistory = (req, res) => {

  const {searchSelection, inputValue} = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    if(searchSelection == 1){
      //user the connection
    connection.query(
      "SELECT * FROM payment WHERE userId = ? AND paymentMode = ?",
      [id, inputValue],
      (err, rows) => {
        // When done with the connection , release it
        connection.release();

        if (!err) {
          res.render("paymenthistory", { rows });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );

    }
    else if (searchSelection == 2){
      connection.query(
        "SELECT * FROM payment WHERE userId = ? AND date = ?",
        [id, inputValue],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();
  
          if (!err) {
            res.render("paymenthistory", { rows });
          } else {
            console.log(err);
          }
  
          console.log("The data from user table: \n", rows);
        }
      );
    }
  });
    
}

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.createAddress = (req, res) => {
  const { title, flatNo, locality, city, pincode, addressCard } = req.body;
  console.log(addressCard);

  pool.getConnection((err, connection) => {
    if (err) throw err; // not  connected
    console.log("connected as ID " + connection.threadId);

    let searchTerm = req.body.addressSearch;

    console.log(searchTerm);
    if (addressCard === undefined) {
      connection.query(
        "INSERT INTO address SET title = ?, flatNo = ?, locality = ?, city = ?, pincode = ?, userId = ?",
        [title, flatNo, locality, city, pincode, id],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; // not  connected
              console.log("connected as ID " + connection.threadId);

              //user the connection
              connection.query(
                "SELECT * FROM address where userId = ?",
                [id],
                (err, rows) => {
                  // When done with the connection , release it
                  connection.release();

                  if (!err) {
                    res.render("savedaddress", { rows });
                  } else {
                    console.log(err);
                  }

                  console.log("The data from user table: \n", rows);
                }
              );
            });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    //user the connection
    else if (addressCard == 1) {
      console.log("title");
      connection.query(
        "SELECT * FROM address WHERE title LIKE ?",
        ['%' + searchTerm + '%'],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            res.render("savedaddress", { rows });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (addressCard == 2) {
      connection.query(
        "SELECT * FROM address WHERE locality LIKE ?",
        ['%' + searchTerm + '%'],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            res.render("savedaddress", { rows });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (addressCard == 3) {
      connection.query(
        "SELECT * FROM address WHERE city LIKE ?",
        ['%' + searchTerm + '%'],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            res.render("savedaddress", { rows });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (addressCard == 4) {
      connection.query(
        "SELECT * FROM address WHERE pincode LIKE ?",
        ['%' + searchTerm + '%'],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            res.render("savedaddress", { rows });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
    if (addressCard == 5) {
      connection.query(
        "SELECT * FROM address WHERE flatNo LIKE ?",
        ['%' + searchTerm + '%'],
        (err, rows) => {
          // When done with the connection , release it
          connection.release();

          if (!err) {
            res.render("savedaddress", { rows });
          } else {
            console.log(err);
          }

          console.log("The data from user table: \n", rows);
        }
      );
    }
  });
};

// exports.findAddress = (req, res) => {

//     const {addressCard} = req.body;
//     pool.getConnection((err, connection) => {
//         if(err) throw err; // not  connected
//         console.log('connected as ID ' + connection.threadId)

//         console.log(addressCard)
//         console.log(searchTerm)

//         //user the connection

//     })

// }
