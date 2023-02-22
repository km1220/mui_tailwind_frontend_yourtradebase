import _ from 'lodash';
import React from 'react';

function Basic(props) {
  // let x;
  // let xxx = [];
  // let yyy = [1, 2, 3];
  // if (x) console.log('x ', true);
  // if (xxx) console.log('xxx ', true);
  // if (yyy) console.log('yyy ', true);

  // console.log( JSON.stringify(''));

  // let aaa;
  // let bbb = 123;
  // console.log(aaa || bbb);
  // console.log(''.split(' '));


  // let test = {// user_id: 0,
  //   quoteAccepted: [1, 2, 3],
  //   onlinePaymentReceived: [],
  //   quoteReplyReceived: [],
  //   invoiceReplyReceived: [],
  //   jobReplyReceived: [],
  //   customerReplyReceived: [],
  //   fieldTeamCreatesNote: [],
  //   fieldTeamUploadsFile: [],
  //   fieldTeamCapturesJobSignature: []
  // }

  // console.log(_.mapValues(test, (each, i) => (`${each.length}length +++ ${i}`)))
  // console.log(_.isEmpty({}))
  // console.log(_.isEmpty({ a: 1 }))
  // console.log(_.isEmpty({ a: {} }))

  // let x = [1, 2, {a: 3}, 4 ,6]
  // console.log('dsafsdfsdfsdfs', x.find(e => e.a === 3))


  let x = { 0: 123, 2: 123, 4: 23189 };
  'xxxx', _.map(x, (a, b, c, d, e) => {
    console.log(a, b, c, d, e)
  });

  return (<></>);
}

export default Basic