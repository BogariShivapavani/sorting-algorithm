def bubble_sort(array):
    steps = []
    arr = array.copy()
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            steps.append(arr.copy())  # Capture the state after each swap
    return steps


def quick_sort(array):
    steps = []

    def quick_sort_helper(arr, low, high):
        if low < high:
            pi = partition(arr, low, high)
            quick_sort_helper(arr, low, pi)
            quick_sort_helper(arr, pi + 1, high)

    def partition(arr, low, high):
        pivot = arr[high - 1]
        i = low - 1
        for j in range(low, high - 1):
            if arr[j] < pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
            steps.append(arr.copy())  # Capture the state after each swap
        arr[i + 1], arr[high - 1] = arr[high - 1], arr[i + 1]
        steps.append(arr.copy())  # Capture the state after pivot swap
        return i + 1

    quick_sort_helper(array.copy(), 0, len(array))
    return steps


def merge_sort(array):
    steps = []

    def merge_sort_helper(arr):
        if len(arr) > 1:
            mid = len(arr) // 2
            left_half = arr[:mid]
            right_half = arr[mid:]

            merge_sort_helper(left_half)
            merge_sort_helper(right_half)

            i = j = k = 0
            while i < len(left_half) and j < len(right_half):
                if left_half[i] < right_half[j]:
                    arr[k] = left_half[i]
                    i += 1
                else:
                    arr[k] = right_half[j]
                    j += 1
                k += 1
            while i < len(left_half):
                arr[k] = left_half[i]
                i += 1
                k += 1
            while j < len(right_half):
                arr[k] = right_half[j]
                j += 1
                k += 1

            steps.append(arr.copy())  # Capture the state after merging

    merge_sort_helper(array.copy())
    return steps


def insertion_sort(array):
    steps = []
    arr = array.copy()
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
        steps.append(arr.copy())  # Capture the state after each insertion
    return steps


def selection_sort(array):
    steps = []
    arr = array.copy()
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        steps.append(arr.copy())  # Capture the state after each selection and swap
    return steps


def heap_sort(array):
    steps = []
    arr = array.copy()

    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            steps.append(arr.copy())  # Capture the state after each swap
            heapify(arr, n, largest)

    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        steps.append(arr.copy())  # Capture the state after each swap
        heapify(arr, i, 0)

    return steps
