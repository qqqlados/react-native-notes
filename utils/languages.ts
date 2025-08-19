import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: {
			common: {
				start: "Start",
				back: "Back",
				cancel: "Cancel",
				delete: "Delete",
				save: "Save",
				saving: "Saving...",
				create: "Create",
				creating: "Creating...",
			},
			tabs: {
				myNotes: "My Notes",
				createNote: "Create Note",
			},
			home: {
				welcomeTitle: "Welcome to Notes",
				welcomeSubtitle: "Capture your thoughts, ideas, and memories",
				quote: "Writing is the painting of the voice.",
				quoteAuthor: "Voltaire",
				descriptionLine1: "Start your journey of capturing thoughts and ideas.",
				descriptionLine2: "Create, edit, and organize your notes with ease.",
			},
			notes: {
				myNotesTitle: "My Notes",
				noNotes: 'No notes. Go to the "Create Note" tab',
				notFound: "Note not found",
				createdAt: "Created:",
			},
			createNote: {
				title: "Create note",
				placeholderTitle: "Title",
				placeholderText: "Your beautiful note description... ",
			},
			editNote: {
				title: "Edit note",
				placeholderText: "Text content",
			},
			deleteNote: {
				confirm: "Are you sure you want to delete the note?",
			},
		},
	},
	fr: {
		translation: {
			common: {
				start: "Commencer",
				back: "Retour",
				cancel: "Annuler",
				delete: "Supprimer",
				save: "Enregistrer",
				saving: "Enregistrement...",
				create: "Créer",
				creating: "Création...",
			},
			tabs: {
				myNotes: "Mes notes",
				createNote: "Créer une note",
			},
			home: {
				welcomeTitle: "Bienvenue dans Notes",
				welcomeSubtitle: "Capturez vos pensées, idées et souvenirs",
				quote: "L'écriture est la peinture de la voix.",
				quoteAuthor: "Voltaire",
				descriptionLine1: "Commencez à capturer vos pensées et idées.",
				descriptionLine2: "Créez, modifiez et organisez vos notes facilement.",
			},
			notes: {
				myNotesTitle: "Mes notes",
				noNotes: 'Aucune note. Allez dans l’onglet "Créer une note"',
				notFound: "Note introuvable",
				createdAt: "Créé le :",
			},
			createNote: {
				title: "Créer une note",
				placeholderTitle: "Titre",
				placeholderText: "La belle description de votre note...",
			},
			editNote: {
				title: "Modifier la note",
				placeholderText: "Contenu du texte",
			},
			deleteNote: {
				confirm: "Voulez-vous vraiment supprimer la note ?",
			},
		},
	},
	it: {
		translation: {
			common: {
				start: "Inizia",
				back: "Indietro",
				cancel: "Annulla",
				delete: "Elimina",
				save: "Salva",
				saving: "Salvataggio...",
				create: "Crea",
				creating: "Creazione...",
			},
			tabs: {
				myNotes: "Le mie note",
				createNote: "Crea nota",
			},
			home: {
				welcomeTitle: "Benvenuto in Notes",
				welcomeSubtitle: "Cattura i tuoi pensieri, idee e ricordi",
				quote: "La scrittura è la pittura della voce.",
				quoteAuthor: "Voltaire",
				descriptionLine1:
					"Inizia il tuo percorso per catturare pensieri e idee.",
				descriptionLine2:
					"Crea, modifica e organizza le tue note con facilità.",
			},
			notes: {
				myNotesTitle: "Le mie note",
				noNotes: 'Nessuna nota. Vai alla scheda "Crea nota"',
				notFound: "Nota non trovata",
				createdAt: "Creato il:",
			},
			createNote: {
				title: "Crea nota",
				placeholderTitle: "Titolo",
				placeholderText: "La bellissima descrizione della tua nota...",
			},
			editNote: {
				title: "Modifica nota",
				placeholderText: "Contenuto del testo",
			},
			deleteNote: {
				confirm: "Sei sicuro di voler eliminare la nota?",
			},
		},
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
