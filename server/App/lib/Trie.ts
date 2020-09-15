import fs from "fs";
import path from "path";

import { lowerCase } from "./util";

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
            const lowerChar: string = lowerCase(char);

            if (!currentNode?.children.has(lowerChar)) {
                const newNode = new TrieNode(lowerChar);

                currentNode?.children.set(lowerChar, newNode);
                currentNode = newNode;
            } else {
                currentNode = currentNode.children.get(lowerChar);
            }
        }

        if (currentNode && !currentNode.isLeaf) {
            currentNode.isLeaf = true;
        }
    }

    public getWordsFromNumber(
        strNum: string,
        currentNode: TrieNode = this.head,
        depth: number = 0,
        words: Set<string> = new Set<string>(),
        currentStr: string = ""
    ): string[] {
        const char: string = strNum[depth];

        currentStr += currentNode.char;

        if (currentNode.isLeaf && currentStr.length === strNum.length) {
            words.add(currentStr);
        }

        currentNode.children.forEach(childNode => {
            if (this.isInKeyMap(childNode.char, char)) {
                this.getWordsFromNumber(strNum, childNode, depth + 1, words, currentStr);
            }
        });

        return Array.from(words);
    }

    private isInKeyMap(char: string, num: string): boolean {
        return num in this.keyMap && this.keyMap[num].includes(char);
    }

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
}

class TrieNode {
    public constructor(
        public readonly char: string,
        public readonly children: Map<string, TrieNode> = new Map(),
        public isLeaf: boolean = false
    ) {}
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
