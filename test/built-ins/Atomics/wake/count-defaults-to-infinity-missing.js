// Copyright (C) 2018 Amal Hussein.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-atomics.wake
description: >
  Default to +Infinity when missing 'count' argument to Atomics.wake
info: |
  Atomics.wake( typedArray, index, count )

  ...
  3. If count is undefined, let c be +∞.
  ...

features: [Atomics, SharedArrayBuffer, TypedArray]
---*/

var NUMAGENT = 4; // Total number of agents started
var WAKEUP = 0; // Index all agents are waiting on

function getReport() {
  var r;
  while ((r = $262.agent.getReport()) == null) {
    $262.agent.sleep(10);
  }
  return r;
}

$262.agent.start(`
$262.agent.receiveBroadcast(function(sab) {
  var i32a = new Int32Array(sab);
  $262.agent.report("A " + Atomics.wait(i32a, ${WAKEUP}, 0, 50));
  $262.agent.leaving();
});
`);

$262.agent.start(`
$262.agent.receiveBroadcast(function(sab) {
  var i32a = new Int32Array(sab);
  $262.agent.report("B " + Atomics.wait(i32a, ${WAKEUP}, 0, 50));
  $262.agent.leaving();
});
`);

$262.agent.start(`
$262.agent.receiveBroadcast(function(sab) {
  var i32a = new Int32Array(sab);
  $262.agent.report("C " + Atomics.wait(i32a, ${WAKEUP}, 0, 50));
  $262.agent.leaving();
});
`);

$262.agent.start(`
$262.agent.receiveBroadcast(function(sab) {
  var i32a = new Int32Array(sab);
  $262.agent.report("D " + Atomics.wait(i32a, ${WAKEUP}, 0, 50));
  $262.agent.leaving();
});
`);

var i32a = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT));

$262.agent.broadcast(i32a.buffer);

$262.agent.sleep(20);

assert.sameValue(Atomics.wake(i32a, WAKEUP /*, count missing */), NUMAGENT);

var sortedReports = [];
for (var i = 0; i < NUMAGENT; i++) {
  sortedReports.push(getReport());
}
sortedReports.sort();

assert.sameValue(sortedReports[0], "A ok");
assert.sameValue(sortedReports[1], "B ok");
assert.sameValue(sortedReports[2], "C ok");
assert.sameValue(sortedReports[3], "D ok");
