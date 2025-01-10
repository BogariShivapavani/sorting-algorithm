from flask import Flask, request, jsonify  
from sorting_algorithms import bubble_sort, quick_sort, merge_sort, insertion_sort, selection_sort, heap_sort

app = Flask(__name__)

@app.route('/sort', methods=['POST'])
def sort_array():
    data = request.json
    print("Requested response:",data)
    algorithm = data.get('algorithm')
    array = data.get('array')
    
    if not array or not isinstance(array, list):
        return jsonify({"error": "Invalid input. 'array' must be a list."}), 400

    # Call the appropriate sorting function based on the algorithm
    if algorithm == "bubble":
        steps = bubble_sort(array)
    elif algorithm == "quick":
        steps = quick_sort(array)
    elif algorithm == "merge":
        steps = merge_sort(array)
    elif algorithm == "insertion":
        steps = insertion_sort(array)
    elif algorithm == "selection":
        steps = selection_sort(array)
    elif algorithm == "heap":
        steps = heap_sort(array)
    else:
        return jsonify({"error": "Unsupported sorting algorithm."}), 400

    return jsonify({"steps": steps})

if __name__ == '__main__':
    app.run(debug=True)
