const startButton = document.getElementById("start");
const algorithmSelect = document.getElementById("algorithm");
const inputArrayField = document.getElementById("array-input");
const outputContainer = document.getElementById("output-container");

// Function to display sorting steps in the output container
function displaySteps(steps) {
    outputContainer.innerHTML = ""; // Clear previous output
    steps.forEach((step, index) => {
        const stepElement = document.createElement("div");
        stepElement.textContent = `Step ${index + 1}: [${step.join(", ")}]`;
        outputContainer.appendChild(stepElement);
    });
}

// Function to simulate sorting algorithms and generate steps
function simulateSorting(algorithm, array) {
    const steps = [];
    if (algorithm === "bubble") {
        bubbleSort(array, steps);
    } else if (algorithm === "selection") {
        selectionSort(array, steps);
    } else if (algorithm === "insertion") {
        insertionSort(array, steps);
    } else if (algorithm === "merge") {
        mergeSort(array, steps);
    } else if (algorithm === "quick") {
        quickSort(array, steps);
    } else if (algorithm === "heap") {
        heapSort(array, steps);
    }
    return steps;
}
// Bubble Sort implementation
function bubbleSort(arr, steps) {
    const array = [...arr]; // Make a copy of the array
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        const phaseSteps = []; // Steps for the current phase
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
            phaseSteps.push([...array]); // Record the current step
        }
        steps.push(phaseSteps); // Record the entire phase
    }
}
// Selection Sort implementation
function selectionSort(arr, steps) {
    const array = [...arr]; // Make a copy of the array
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        // Swap
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        steps.push([...array]); // Record the current step
    }
}

// Insertion Sort implementation
function insertionSort(arr, steps) {
    const array = [...arr]; // Make a copy of the array
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
        steps.push([...array]); // Record the current step
    }
}

// Merge Sort implementation
function mergeSort(arr, steps) {
    function mergeHelper(array) {
        if (array.length <= 1) {
            return array;
        }

        const mid = Math.floor(array.length / 2);
        const left = mergeHelper(array.slice(0, mid));
        const right = mergeHelper(array.slice(mid));

        return merge(left, right);
    }

    function merge(left, right) {
        const merged = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                merged.push(left[i]);
                i++;
            } else {
                merged.push(right[j]);
                j++;
            }
        }

        while (i < left.length) {
            merged.push(left[i]);
            i++;
        }

        while (j < right.length) {
            merged.push(right[j]);
            j++;
        }

        steps.push([...merged]); // Record the current step
        return merged;
    }

    mergeHelper(arr);
}

// Quick Sort implementation
function quickSort(arr, steps) {
    function quickHelper(array, low, high) {
        if (low < high) {
            const pi = partition(array, low, high);
            quickHelper(array, low, pi - 1);
            quickHelper(array, pi + 1, high);
        }
    }

    function partition(array, low, high) {
        const pivot = array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        steps.push([...array]); // Record the current step
        return i + 1;
    }

    quickHelper(arr, 0, arr.length - 1);
}

// Heap Sort implementation
function heapSort(arr, steps) {
    const array = [...arr]; // Make a copy of the array
    const n = array.length;

    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i);
    }

    // Extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
        // Swap the root (largest) with the last element
        [array[0], array[i]] = [array[i], array[0]];
        steps.push([...array]); // Record the current step

        // Heapify the reduced heap
        heapify(array, i, 0);
    }

    // Heapify function
    function heapify(arr, size, root) {
        let largest = root;
        const left = 2 * root + 1;
        const right = 2 * root + 2;

        // Check if left child is larger
        if (left < size && arr[left] > arr[largest]) {
            largest = left;
        }

        // Check if right child is larger
        if (right < size && arr[right] > arr[largest]) {
            largest = right;
        }

        // If largest is not root, swap and heapify
        if (largest !== root) {
            [arr[root], arr[largest]] = [arr[largest], arr[root]];
            heapify(arr, size, largest);
        }
    }
}



// Event Listener for Start Button
startButton.addEventListener("click", () => {
    const algorithm = algorithmSelect.value;
    const input = inputArrayField.value;

    if (!input) {
        alert("Please enter an array.");
        return;
    }

    // Parse input array
    const array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    if (array.length === 0) {
        alert("Invalid input. Please enter a valid array.");
        return;
    }

    // Simulate sorting and display steps
    const steps = simulateSorting(algorithm, array);
    displaySteps(steps);
});
