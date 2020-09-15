import fs from "fs";
import path from "path";

import { lowerCase } from "./util";

export class Trie {
    public head = new ChildNode("");

    private keyMap: Record<string, string> = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz"
    };

    public insertMany(words: string[]): void {
        for (const word of words) {
            this.insert(word);
        }
    }

    public insert(word: string): void {
        const letters = word.split("");
        let currentNode: ChildNode | undefined = this.head;

        for (const char of letters) {
            const key = lowerCase(char);

            if (!currentNode?.children.has(key)) {
                const newNode = new ChildNode(key);
                const parentNode = new TrieNode(currentNode?.parent, currentNode?.parentKey);

                newNode.parent = parentNode;
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

    public getWordsFromNumber(
        strNum: string,
        currentNode = this.head,
        depth = 0,
        words: Set<string> = new Set<string>()
    ): string[] {
        currentNode.children.forEach(childNode => {
            if (childNode.isLeaf) {
                if (depth >= strNum.length) {
                    words.add(currentNode.getWord());
                }
            }

            const char: string = strNum[depth];
            const nextSequence: string = this.keyMap?.[char] || "";

            if (nextSequence.indexOf(childNode.key) !== -1) {
                this.getWordsFromNumber(strNum, childNode, depth + 1, words);
            }
        });

        return Array.from(words);
    }
}

class TrieNode {
    public constructor(public parent?: TrieNode, public parentKey?: string) {}

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

class ChildNode extends TrieNode {
    public constructor(
        public key: string,
        public children: Map<string, ChildNode> = new Map(),
        public isLeaf: boolean = false,
        public parent?: TrieNode,
        public parentKey?: string
    ) {
        super(parent, parentKey);
    }
}

export function createTrieAndSeed(): Trie {
    const trie = new Trie();

    fs.readFile(path.resolve(__dirname, "./dictionary.txt"), (err, data) => {
        if (err) {
            throw new Error("Failed to construct Trie with dictionary");
        }

        const words = data
            .toString()
            .replace(/[:;!?",'\\[\]\d$]/g, "")
            .replace(/\\-/g, " ")
            .toLowerCase()
            .split(/\s+/g);

        trie.insertMany(words);
    });

    return trie;
}
