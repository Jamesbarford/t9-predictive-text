import { lowerCase } from "./util";
import fs from "fs";
import path from "path";

export class Trie {
    public head = new TrieNode("");

    public insertMany(words: string[]): void {
        for (const word of words) {
            this.insert(word);
        }
    }

    public insert(word: string): void {
        const letters = word.split("");
        let currentNode: TrieNode | undefined = this.head;

        for (const char of letters) {
            const key = lowerCase(char);

            if (!currentNode || !currentNode.children.has(key)) {
                const newNode = new TrieNode(key);

                newNode.parent = currentNode;
                newNode.parentKey = currentNode?.key;

                currentNode?.children.set(key, newNode);
                currentNode = newNode;
            } else {
                currentNode.parentKey = currentNode.key;
                currentNode = currentNode.children.get(key);
            }
        }

        if (currentNode && !currentNode.isLeaf) {
            currentNode.isLeaf = true;
            currentNode.parentKey = currentNode.key;
        }
    }

    // flattens all nodes to array.
    public printAll(node = this.head, arr: TrieNode[] = []): TrieNode[] {
        node.children.forEach(n => {
            arr.push(n);
            if (n.children.size > 0) {
                n.children.forEach(little => {
                    arr.push(little);
                    arr.push(...this.printAll(little));
                });
            }
        });

        return arr;
    }

    public find(partialWord: string): string[] {
        let node = this.head;
        const output: string[] = [];
        const lowerCased = String(lowerCase(partialWord));

        for (let i = 0; i < lowerCased.length; ++i) {
            const child = node.children.get(lowerCased[i]);
            if (child) {
                node = child;
            } else {
                return output;
            }
        }

        return this.printToLeaf(node);
    }

    private printToLeaf(currentNode: TrieNode = this.head, words: string[] = []): string[] {
        if (currentNode.isLeaf) words.push(currentNode.getWord());

        for (const childNode of currentNode.children.values()) {
            this.printToLeaf(childNode, words);
        }

        return words;
    }
}

class TrieNode {
    public constructor(
        public key: string,
        public children: Map<string, TrieNode> = new Map(),
        public isLeaf: boolean = false,
        public parent: TrieNode | undefined = undefined,
        public parentKey?: string
    ) {}

    public getWord(): string {
        const output = [];
        let node: TrieNode | undefined = this;

        while (node?.parentKey != null) {
            output.unshift(node.parentKey);
            node = node.parent;
        }

        return output.join("");
    }
}

export function createTrieAndSeed(): Trie {
    const trie = new Trie();

    fs.readFile(path.resolve(__dirname, "./dictionary.txt"), (err, data) => {
        if (err) {
            throw new Error("failed to construct Trie with dictionary");
        }

        const words = data
            .toString()
            .replace(/[:;!?",'\.\*\[\]\d\$]/g, "")
            .replace(/\-\-/g, " ")
            .toLowerCase()
            .split(/\s+/g);

        trie.insertMany(words);
    });

    return trie;
}
