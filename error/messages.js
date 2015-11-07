function wrapWithNewLines(message) {
  return `\n ${message} \n`;
}

module.exports = {
 'requiredFlags': function(flags) {               
    return wrapWithNewLines(`required flags missing: ${flags}`);
  },
  'missingArgs': function(flagArgs) {
     var hasS = flagArgs.length > 1 ? 's' : '';
     return wrapWithNewLines(`The required flag${hasS} ${flagArgs} has no argument${hasS}`);
  },
};
