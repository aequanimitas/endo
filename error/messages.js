function wrapWithNewLines(message) {
  return '\n' + message + '\n';
}

module.exports = {
 'requiredFlags': function(flags) {               
    return wrapWithNewLines('required flags missing: ' + flags);
  },
  'missingArgs': function(flagArgs) {
     var missingFlags = flagArgs.map(removeFlagSymbols),
         hasS = missingFlags.length > 1 ? 's' : '';
     return wrapWithNewLines('The required flag' + hasS + 
            ' ' + missingFlags +
            ' has no argument' + hasS);
  },
};
