import { Fragment, useState, useEffect } from 'react';

import Sunrise from '../days/Sunrise';
import Morning from '../days/Morning';
import Afternoon from '../days/Afternoon';
import Sunset from '../days/Sunset';
import Night from '../days/Night';

const Time = () => {

  const [time, setTime] = useState(new Date());
  const [visible, setVisible] = useState(true);


  useEffect(() => {

    const currentTime = setInterval(() => {

      setTime(new Date(), 1000)

      return () => {
        clearInterval(currentTime)
      }

    })

  }, []);


  let sunrise = time.getHours() >= 6 && time.getHours() < 7;
  let morning = time.getHours() >= 7 && time.getHours() < 12;
  let afternoon = time.getHours() >= 12 && time.getHours() < 17;
  let sunset = time.getHours() >= 17 && time.getHours() < 18;
  let night = time.getHours() >= 18 || time.getHours() < 6;

  return (

    <Fragment>

      { visible && (

        <Fragment>

          { sunrise && ( <Sunrise time={time} setVisible={setVisible} /> ) }

          { morning && ( <Morning time={time} setVisible={setVisible} /> ) }

          { afternoon && ( <Afternoon time={time} setVisible={setVisible} /> ) }

          { sunset && ( <Sunset time={time} setVisible={setVisible} /> ) }

          { night && ( <Night time={time} setVisible={setVisible} /> ) }

        </Fragment>

      ) }

    </Fragment>

  )
}

export default Time;
