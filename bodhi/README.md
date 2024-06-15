# Bodhi

The goal of Bodhi is to empower novice researchers to quickly understand a field of research. With Bodhi, users can discover the most pivotal papers in a specific area and read them in order of complexity.

## How it Works

The process consists of four main steps. Because I thought of them in the shower, they are subject to change:

1. **Embed Research Papers:**
   - Embed the metadata of research papers and perform clustering to find different research areas.

2. **Filter Important Papers:**
   - Within each cluster, filter for the top `n` most important papers. The importance score reflects how necessary it is to read a particular paper to understand the research in its cluster. 
   - For example, a seminal paper would have a high importance score.

3. **Create Directed Graphs:**
   - Create a directed graph for each sparsified cluster, ensuring that edges flow from simpler papers to more complex ones.

4. **Find Minimum Spanning Arborescence (MSA):**
   - Find the MSA for each directed graph using the Chu-Liu/Edmonds/Bock Algorithm. The resulting arborescence serves as a reading path for researchers.
   - For a detailed explanation of the Chu-Liu/Edmonds/Bock Algorithm, refer to [Section 2.2](https://www.cs.cmu.edu/~15850/notes/lec2.pdf).

## Integration with Scholarly

Bodhi is a component of [Scholarly](https://github.com/RGBmarya/scholarly/). Scholarly simplifies the literature review process for researchers by providing in-line explanations, abstract-to-text hyperlinks, and a recommendation engine for important current and future research papers. 

More coming soon :)
## Usage

To use this tool, follow the steps below:

1. Clone the repository:
    ```sh
    git clone https://github.com/RGBmarya/scholarly.git
    ```

2. Navigate to the project directory:
    ```sh
    cd scholarly
    ```

3. Follow the instructions in the Jupyter Notebook (`main.ipynb`) to embed research papers, filter important papers, create directed graphs, and find the MSA for each cluster.

## Contribution

Feel free to contribute to the project by submitting a pull request or opening an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


--- 
Thanks for trying Bodhi! (and shoutout to those who get the reference). Much ❤️.

\- Mihir