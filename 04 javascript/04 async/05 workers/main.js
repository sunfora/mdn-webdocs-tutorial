// Create a new worker, giving it the code in "generate.js"
const worker = new Worker("./generate.js");

const generateUniqueID = (c => () => c++)(0);
const resolvers = new Map();

function resolveById(result, id) {
  const resolve = resolvers.get(id);
  resolvers.delete(id);
  resolve(result);
}

// When the worker sends a message back to the main thread,
// resolve the promise
worker.addEventListener("message", (message) => {
  resolveById(message.data.value, message.data.id);
});

function generatePrimes(quota) {
  return new Promise((resolve, reject) => {
      const id = generateUniqueID();
      resolvers.set(id, resolve);
      worker.postMessage({
        command: "generate",
        quota,
        id
      });
  });
}

// Now we can use promise at one place instead
const output = document.querySelector("#output");

const requests = document.createElement("p");
requests.textContent = "requests";

const results = document.createElement("ol");

output.append(requests);
output.append(results);

document.querySelector("#generate").addEventListener("click", () => {
  const quota = document.querySelector("#quota").value;
  generatePrimes(quota).then(
    primes => {
      const result = document.createElement("li");

      const p = document.createElement("p");
      p.textContent = `Finished generating ${primes.length} primes!`;

      result.append(p);
      
      if (primes.length < 1000) {

        const expand = document.createElement("details");
        const expsum = document.createElement("summary");

        expsum.textContent = "expand";

        expand.append(expsum);

        const primeList = document.createElement("ul");
        expand.append(primeList);
        
        for (prime of primes) {
          const primeLi = document.createElement("li");
          primeLi.textContent = prime;
          primeList.append(primeLi);
        }

        result.append(expand);
      }

      results.append(result);
    }
  );
});

document.querySelector("#reload").addEventListener("click", () => {
  document.querySelector("#user-input").value =
    'Try typing in here immediately after pressing "Generate primes"';
  results.textContent = "";
  document.location.reload();
});
