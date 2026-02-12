function check_data_size(sample) {
  if (sample < 1000) {
    return "Small dataset";
  }
  if (sample > 1000 && sample <= 10000) {
    return "Medium dataset";
  }
  if (sample > 10000) {
    return "Large dataset";
  }
}

console.log(check_data_size(100)); //small dataset
console.log(check_data_size(5000)); // Medium dataset
console.log(check_data_size(15000)); // Large dataset

// No 3

var model_results = {
  accuracy: 0.85,
  precision: 0.82,
  recall: 0.88,
};

model_results.accuracy += 0.05;

model_results.f1_score = 0.85;

console.log(model_results);
