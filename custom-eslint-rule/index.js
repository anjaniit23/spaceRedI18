// currently only check translation hook

const __commonT = (a) => a;
const __unknownT = (a) => a;
const __workflowT = (a) => a;

// should throw error
__commonT("random label should throw error");

// should NOT throw error
__commonT("Add User");
__unknownT("i am in unknown");
__workflowT("i am in workflow");

const object = {
  __commonT: (a) => `${a} + ${a}`,
  anotherFunction: function (a) {
    this.__commonT(a);
  },
};

// should throw error
object.__commonT("Add User");
object.anotherFunction("another random");
