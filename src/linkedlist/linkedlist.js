class Node {
    constructor(data){
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor(head = null){
        this.head = head
    }

    addNewNode(data){
        const node = new Node(data);

        if (this.head === null) {
        this.head = node;
        } else {
            node.next = this.head;

            this.head = node;

            return this.head;
        }
    }

    moveNode(memory){
        //move node (memory) places back in the list. Note, this only moves head node, may have to implement others
        let currentNode = this.head;
        if(memory < list.lengthOfList()){
            for(let i = 0; i < memory; i++){
                let temp = currentNode.next.data;
                currentNode.next.data = currentNode.data;
                currentNode.data = temp;
                currentNode = currentNode.next;
            }
            return this.head
        } else {
            for(let i = 0; i < list.lengthOfList() - 1; i++){
                let temp = currentNode.next.data;
                currentNode.next.data = currentNode.data;
                currentNode.data = temp;
                currentNode = currentNode.next;
            }
            return this.head
        }
        
    }

    returnAllData(){
        // Return all items in the queue.
        let newArray = [];
        let currentNode = this.head;

        while (currentNode) {
        newArray.push(currentNode.data);
        currentNode = currentNode.next;
        }
        return newArray;
    }

    lengthOfList(){
        let currentNode = this.head;
        let count = 0;
        while(currentNode){
            count++;
            currentNode = currentNode.next;
        }
        return count;
    }
}

module.exports = LinkedList;