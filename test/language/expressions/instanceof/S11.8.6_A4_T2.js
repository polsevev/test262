// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: Only constructor call (with "new" keyword) makes instance
es5id: 11.8.6_A4_T2
description: Checking Number case
---*/

//CHECK#1
if (0 instanceof Number) {
	throw new Test262Error('#1: 0 is not instanceof Number');
}

//CHECK#2
if (Number(0) instanceof Number) {
	throw new Test262Error('#2: Number(0) is not instanceof Number');
}

//CHECK#3
if (new Number instanceof Number !== true) {
	throw new Test262Error('#3: new Number instanceof Number');
}
